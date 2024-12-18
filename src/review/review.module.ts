import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewController } from './review.controller'
import { PrismaService } from 'src/prisma.service'
import { VehicleService } from 'src/vehicle/vehicle.service'

@Module({
	controllers: [ReviewController],
	providers: [ReviewService, PrismaService, VehicleService]
})
export class ReviewModule {}
