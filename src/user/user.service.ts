import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { EnumUserRole } from '@prisma/client'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				orders: true,
				reviews: true
			}
		})

		return user
	}

	async getByEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email
			},
			include: {
				orders: true
			}
		})

		return user
	}

	async getByPhone(phone: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				phone
			},
			include: {
				orders: true
			}
		})

		return user
	}

	async create(dto: AuthDto) {
		return this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				phone: dto.phone,
				password: await hash(dto.password),
				role: 'USER'
			}
		})
	}

	async checkOperatorRole(userId: string) {
		const existingUser = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (existingUser && existingUser.role !== EnumUserRole.OPERATOR) {
			throw new BadRequestException(
				'У вас нет доступа для выполнения этого действия'
			)
		}
		return true
	}

	async checkAdminRole(userId: string) {
		const existingUser = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (existingUser && existingUser.role !== EnumUserRole.ADMIN) {
			throw new BadRequestException(
				'У вас нет доступа для выполнения этого действия'
			)
		}
		return true
	}

	async updateRole(adminId: string, userId: string, role: EnumUserRole) {
		await this.checkAdminRole(adminId)

		const existingUser = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		const correctRole = Object.values(EnumUserRole).includes(
			role as EnumUserRole
		)

		if (!existingUser) {
			throw new BadRequestException(
				`Пользователь с ID ${userId} не найден`
			)
		}

		if (!correctRole) {
			throw new BadRequestException(`Недопустимый статус: ${role}`)
		}

		const updatedRole = await this.prisma.user.update({
			where: { id: userId },
			data: { role }
		})

		return updatedRole
	}
}
