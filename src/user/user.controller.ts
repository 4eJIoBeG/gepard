import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { EnumUserRole } from '@prisma/client'
import { CurrentUser } from './decorators/user.decorator'

@Controller('users')
@ApiBearerAuth()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Get('profile/:id')
	async getProfile(@Param('id') userId: string) {
		return this.userService.getById(userId)
	}

	@Auth()
	@ApiBody({
		description: 'Обновление роли пользователя',
		schema: {
			type: 'object',
			properties: {
				role: {
					type: 'string',
					enum: Object.values(EnumUserRole),
					example: EnumUserRole.OPERATOR
				}
			}
		}
	})
	@Patch('update-role/:id')
	async updateRole(
		@CurrentUser('id') adminId: string,
		@Param('id') userId: string,
		@Body('role') newRole: string
	) {
		const updatedRole = await this.userService.updateRole(
			adminId,
			userId,
			newRole as EnumUserRole
		)
		return updatedRole
	}
}
