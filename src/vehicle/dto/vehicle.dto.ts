import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class VehicleDto {
	@IsString({
		message: 'Название обязательно'
	})
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	@ApiProperty({ default: 'Грузочивичек Джимми' })
	title: string

	@IsString({ message: 'Описание обязательно' })
	@IsNotEmpty({ message: 'Описание не может быть пустым' })
	@ApiProperty({ default: 'Грузоподъемность 3т' })
	description: string

	@IsNumber({}, { message: 'Цена должна быть числом' })
	@IsNotEmpty({ message: 'Цена не может быть пустой' })
	@ApiProperty({ default: 2500 })
	price: number

	@IsString({
		message: 'Укажите хотя бы одну картинку',
		each: true
	})
	@ArrayMinSize(1, { message: 'Должна быть хотя бы одна картинка' })
	@IsNotEmpty({
		each: true,
		message: 'Путь к картинке не может быть пустым'
	})
	@ApiProperty({
		default: [
			'uploads/vehicles/1.jpg',
			'uploads/vehicles/2.jpg',
			'uploads/vehicles/3.jpg'
		]
	})
	images: string[]

	@IsString({
		message: 'Категория обязательна'
	})
	@IsNotEmpty({ message: 'ID категории не может быть пустым' })
	@ApiProperty({ default: 'id категории' })
	categoryId: string
}
