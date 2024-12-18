import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ReviewDto } from './dto/review.dto'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('reviews')
@ApiBearerAuth()
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Auth()
	@Get(':reviewId')
	async getById(
		@CurrentUser('id') userId: string,
		@Param('reviewId') reviewId: string
	) {
		return this.reviewService.getById(reviewId, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post(':vehicleId')
	async create(
		@CurrentUser('id') userId: string,
		@Param('vehicleId') vehicleId: string,
		@Body() dto: ReviewDto
	) {
		return this.reviewService.create(userId, vehicleId, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':reviewId')
	async delete(
		@Param('reviewId') reviewId: string,
		@CurrentUser('id') userId: string
	) {
		return this.reviewService.delete(reviewId, userId)
	}
}
