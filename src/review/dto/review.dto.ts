import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class ReviewDto {
	@IsString({
		message: 'Текст отзыва должен быть строкой'
	})
	@IsNotEmpty({ message: 'Текст отзыва обязателен' })
	@ApiProperty({ default: 'Хороший водитель и транспорт оценка 4' })
	text: string

	@IsNumber({}, { message: 'Рейтинг должен быть числом' })
	@Min(1, { message: 'Минимальный рейтинг - 1' })
	@Max(5, { message: 'Максимальный рейтинг - 5' })
	@IsNotEmpty({ message: 'Рейтинг обязателен' })
	@ApiProperty({ default: 4 })
	rating: number
}
