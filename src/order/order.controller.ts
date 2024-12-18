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

@Controller('orders')
@ApiBearerAuth()
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('checkout')
	async checkout(@Body() dto: OrderDto, @CurrentUser('id') userId: string) {
		return this.orderService.createPayment(dto, userId)
	}

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

	@Delete(':id')
	async deleteOrder(@Param('id') orderId: string) {
		return await this.orderService.deleteOrder(orderId)
	}
}
