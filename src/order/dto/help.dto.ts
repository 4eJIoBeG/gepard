import { IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class HelpDto {
	@IsString({
		message: 'Введите имя'
	})
	name: string

	@IsOptional()
	@IsString({
		message: 'Номер обязательный'
	})
	@IsPhoneNumber('RU', {
		message: 'Не верный формат номера'
	})
	phone: string

	@IsString({
		message: 'Введите имя'
	})
	comment: string
}
