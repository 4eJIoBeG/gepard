import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MinLength
} from 'class-validator'

export class AuthDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ default: 'Бобр' })
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

	@IsString({
		message: 'Номер обязательный'
	})
	@IsPhoneNumber('RU', {
		message: 'Не верный формат номера'
	})
	@ApiProperty({ default: '+79591234567' })
	phone: string

	@MinLength(6, {
		message: 'Пароль должен быть не менее 6 символов!'
	})
	@IsString({ message: 'Пароль обязателен' })
	@ApiProperty({ default: 'test123' })
	password: string
}
