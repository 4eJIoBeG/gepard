import { ApiProperty } from '@nestjs/swagger'
import { EnumUserRole } from '@prisma/client'
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MinLength
} from 'class-validator'

export class AuthDto {
	@IsOptional()
	@IsString()
	name: string

	@IsString({
		message: 'Почта обязательна'
	})
	@IsEmail(
		{},
		{
			message: 'Не верный формат почты'
		}
	)
	@ApiProperty({ default: 'test1@test.ru' })
	email: string

	@IsOptional()
	@IsString({
		message: 'Номер обязательный'
	})
	@IsPhoneNumber('RU', {
		message: 'Не верный формат номера'
	})
	phone: string

	@MinLength(6, {
		message: 'Пароль должен быть не менее 6 символов!'
	})
	@IsString({ message: 'Пароль обязателен' })
	@ApiProperty({ default: 'test123' })
	password: string

	@IsOptional()
	@IsEnum(EnumUserRole, {
		message: 'Роль пользователя'
	})
	role: EnumUserRole
}
