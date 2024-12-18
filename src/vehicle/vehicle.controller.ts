import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { VehicleDto } from './dto/vehicle.dto'
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger'

@Controller('vehicles')
export class VehicleController {
	constructor(private readonly vehicleService: VehicleService) {}

	@ApiQuery({
		name: 'searchTerm',
		description: 'Введите строку поиска (опционально)',
		required: false,
		type: String
	})
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.vehicleService.getAll(searchTerm)
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.vehicleService.getById(id)
	}

	@Get('by-category/:categoryId')
	async getByCategory(@Param('categoryId') categoryId: string) {
		return this.vehicleService.getByCategory(categoryId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	@ApiBearerAuth()
	async create(@Body() dto: VehicleDto) {
		return this.vehicleService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	@ApiBearerAuth()
	async update(@Param('id') id: string, @Body() dto: VehicleDto) {
		return this.vehicleService.update(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	@ApiBearerAuth()
	async delete(@Param('id') id: string) {
		return this.vehicleService.delete(id)
	}
}
