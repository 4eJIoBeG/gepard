import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { CurrentUser } from './decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('users')
@ApiBearerAuth()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Get('profile')
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getById(id)
	}
}
