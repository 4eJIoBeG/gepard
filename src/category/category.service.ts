import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getById(id: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			},
			include: { vehicles: true }
		})

		if (!category) throw new NotFoundException('Категория не найдена')

		return category
	}

	async create(dto: CategoryDto) {
		return this.prisma.category.create({
			data: {
				title: dto.title,
				description: dto.description
			}
		})
	}

	async update(categoryId: string, dto: CategoryDto) {
		await this.getById(categoryId)

		return this.prisma.category.update({
			where: { id: categoryId },
			data: dto
		})
	}

	async delete(categoryId: string) {
		await this.getById(categoryId)

		return this.prisma.category.delete({
			where: { id: categoryId }
		})
	}
}
