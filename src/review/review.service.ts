import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ReviewDto } from './dto/review.dto'
import { VehicleService } from 'src/vehicle/vehicle.service'

@Injectable()
export class ReviewService {
	constructor(
		private prisma: PrismaService,
		private vehicleService: VehicleService
	) {}

	async getById(id: string, userId: string) {
		const review = await this.prisma.review.findUnique({
			where: {
				id,
				userId
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						phone: true,
						picture: true
					}
				}
			}
		})

		if (!review)
			throw new NotFoundException(
				'Отзыв не найден или вы не являетесь его владельцем'
			)

		return review
	}

	async create(userId: string, vehicleId: string, dto: ReviewDto) {
		await this.vehicleService.getById(vehicleId)

		return this.prisma.review.create({
			data: {
				...dto,
				vehicle: {
					connect: {
						id: vehicleId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async delete(id: string, userId: string) {
		await this.getById(id, userId)

		return this.prisma.review.delete({
			where: {
				id
			}
		})
	}
}
