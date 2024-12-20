import { IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class HelpDto {
	@IsString({
		message: 'Введите имя'
	})
	name: string

	@IsString({
		message: 'Номер обязательный'
	})
	@IsPhoneNumber('RU', {
		message: 'Не верный формат номера'
	})
	phone: string

	@IsOptional()
	@IsString({
		message: 'Введите имя'
	})
	comment: string
}
