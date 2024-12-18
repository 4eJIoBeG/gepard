import { ApiProperty } from '@nestjs/swagger'
import { EnumOrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'

export class OrderDto {
	@IsOptional()
	@IsEnum(EnumOrderStatus, {
		message: 'Статус заказа обязателен'
	})
	status: EnumOrderStatus

	@IsArray({
		message: 'В заказе нет ни одного товара'
	})
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	@ApiProperty({
		default: [{ price: 2500, vehicleId: 'example-vehicle-id' }]
	})
	items: OrderItemDto[]
}

export class OrderItemDto {
	@IsNumber({}, { message: 'Цена должна быть числом' })
	@ApiProperty({ default: 2500 })
	price: number

	@IsString({ message: 'ID эвакуатора должен быть строкой' })
	@ApiProperty({ default: '{id эвакуатора}' })
	vehicleId: string
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
