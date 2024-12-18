import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { VehicleDto } from './dto/vehicle.dto'

@Injectable()
export class VehicleService {
	constructor(private prisma: PrismaService) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.getSearchTermFilter(searchTerm)

		return await this.prisma.vehicle.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				category: true,
				reviews: true
			}
		})
	}

	private async getSearchTermFilter(searchTerm: string) {
		return this.prisma.vehicle.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						},
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			}
		})
	}

	async getById(id: string) {
		const vehicle = await this.prisma.vehicle.findUnique({
			where: {
				id
			},
			include: { category: true, reviews: true }
		})

		if (!vehicle) throw new NotFoundException('Эвакуатор не найден')

		return vehicle
	}

	async getByCategory(categoryId: string) {
		const vehicles = await this.prisma.vehicle.findMany({
			where: {
				category: {
					id: categoryId
				}
			},
			include: { category: true }
		})

		if (!vehicles) throw new NotFoundException('Эвакуаторы не найдены')

		return vehicles
	}

	async create(dto: VehicleDto) {
		return this.prisma.vehicle.create({
			data: {
				title: dto.title,
				description: dto.description,
				price: dto.price,
				images: dto.images,
				categoryId: dto.categoryId
			}
		})
	}

	async update(vehicleId: string, dto: VehicleDto) {
		await this.getById(vehicleId)

		return this.prisma.vehicle.update({
			where: { id: vehicleId },
			data: dto
		})
	}

	async delete(vehicleId: string) {
		await this.getById(vehicleId)

		return this.prisma.vehicle.delete({
			where: { id: vehicleId }
		})
	}
}
