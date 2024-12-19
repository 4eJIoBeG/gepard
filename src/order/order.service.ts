import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { OrderDto } from './dto/order.dto'
import { EnumOrderStatus } from '@prisma/client'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async createPayment(dto: OrderDto, userId: string) {
		const orderItems = dto.items.map(item => ({
			price: item.price,
			vehicle: {
				connect: {
					id: item.vehicleId
				}
			}
		}))

		const order = await this.prisma.order.create({
			data: {
				userId, // Связываем заказ с пользователем
				status: dto.status, // Указываем статус заказа
				items: {
					create: orderItems // Создаём связанные заказы
				}
			},
			include: {
				items: true
			}
		})

		console.log(order)

		return {
			...order
		}
	}

	async updateStatus(orderId: string, status: EnumOrderStatus) {
		const existingOrder = await this.prisma.order.findUnique({
			where: { id: orderId }
		})

		const correctStatus = Object.values(EnumOrderStatus).includes(
			status as EnumOrderStatus
		)

		if (!existingOrder) {
			throw new BadRequestException(`Заказ с ID ${orderId} не найден`)
		}

		if (!correctStatus) {
			throw new BadRequestException(`Недопустимый статус: ${status}`)
		}

		const updatedOrder = await this.prisma.order.update({
			where: { id: orderId },
			data: { status },
			include: {
				items: true
			}
		})

		return updatedOrder
	}

	async deleteOrder(orderId: string) {
		const existingOrder = await this.prisma.order.findUnique({
			where: { id: orderId }
		})

		if (!existingOrder) {
			throw new BadRequestException(`Заказ с ID ${orderId} не найден`)
		}

		return this.prisma.order.delete({
			where: { id: orderId }
		})
	}
}
