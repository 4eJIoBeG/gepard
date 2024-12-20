import { Injectable } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import { HelpDto } from './dto/help.dto'

@Injectable()
export class TelegramService {
	private bot: TelegramBot
	private managerChatId = process.env.MANAGER_CHAT_ID

	constructor() {
		this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: false
		})
	}

	async createHelpRequest(dto: HelpDto) {
		try {
			const message = `
				Новая заявка:
				Имя: ${dto.name}
				Телефон: ${dto.phone}
				${dto.comment ? 'Комментарий: ' + dto.comment : ''}
			`

			await this.bot.sendMessage(this.managerChatId, message, {
				parse_mode: 'HTML'
			})
		} catch (error) {
			console.error('Ошибка отправки сообщения:', error)
		}
	}
}
