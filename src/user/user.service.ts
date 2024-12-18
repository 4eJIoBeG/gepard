import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'

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
				password: await hash(dto.password)
			}
		})
	}
}
