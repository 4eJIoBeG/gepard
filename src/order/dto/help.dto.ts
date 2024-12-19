import { ApiProperty } from '@nestjs/swagger'
import { EnumOrderStatus } from '@prisma/client'
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsPhoneNumber,
	IsString
} from 'class-validator'

export class HelpDto {
	@IsOptional()
	@IsEnum(EnumOrderStatus, {
		message: 'Статус заявки обязателен'
	})
	status: EnumOrderStatus

	@IsString({
		message: 'Введите имя'
	})
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
}

export class UpdateOrderStatusDto {
	@ApiProperty({
		description: 'Новый статус заявки',
		enum: EnumOrderStatus, // Указываем перечисление
		example: EnumOrderStatus.PAID // Пример значения
	})
	@IsEnum(EnumOrderStatus, { message: 'Недопустимый статус заявки' })
	status: EnumOrderStatus
}
