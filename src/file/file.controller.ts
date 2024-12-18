import {
	Controller,
	HttpCode,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FileService } from './file.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger'

@Controller('files')
@ApiBearerAuth()
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@HttpCode(200)
	@UseInterceptors(FilesInterceptor('files'))
	@Auth()
	@Post()
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				files: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	async saveFiles(@UploadedFiles() files: Express.Multer.File[]) {
		return this.fileService.saveFiles(files)
	}
}
