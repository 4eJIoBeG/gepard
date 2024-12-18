import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CategoryDto {
	@IsString({
		message: 'Название обязательно'
	})
	@ApiProperty({ default: 'Эвакуаторы до 3т' })
	title: string

	@IsString({
		message: 'Значение обязательно'
	})
	@ApiProperty({ default: 'Первая категория эвакуаторов' })
	description: string
}
