import {
	Body,
	Controller,
	Delete,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { OrderService } from './order.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { OrderDto } from './dto/order.dto'
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { EnumOrderStatus } from '@prisma/client'
import { HelpDto } from './dto/help.dto'
import { TelegramService } from './telegram.service'

@Controller('orders')
export class OrderController {
	constructor(
		private readonly orderService: OrderService,
		private readonly telegramService: TelegramService
	) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@ApiBearerAuth()
	@Post('checkout')
	async checkout(@Body() dto: OrderDto, @CurrentUser('id') userId: string) {
		return this.orderService.createPayment(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@ApiBody({
		description: 'Отправка заявки на быструю помощь',
		schema: {
			type: 'object',
			example: {
				name: 'Петров Сергей Бобрович',
				phone: '+79590000000',
				comment: 'Спасите помогите на улице Боброва'
			}
		}
	})
	@Post('help')
	async helpRequest(@Body() dto: HelpDto) {
		return this.telegramService.createHelpRequest(dto)
	}

	@ApiBearerAuth()
	@Patch(':id')
	@ApiBody({
		description: 'Обновление статуса заявки',
		schema: {
			type: 'object',
			properties: {
				status: {
					type: 'string',
					enum: Object.values(EnumOrderStatus),
					example: EnumOrderStatus.PAID
				}
			}
		}
	})
	async updateOrderStatus(
		@Param('id') orderId: string,
		@Body('status') newStatus: string
	) {
		const updatedOrder = await this.orderService.updateStatus(
			orderId,
			newStatus as EnumOrderStatus
		)
		return updatedOrder
	}

	@ApiBearerAuth()
	@Delete(':id')
	async deleteOrder(@Param('id') orderId: string) {
		return await this.orderService.deleteOrder(orderId)
	}
}
