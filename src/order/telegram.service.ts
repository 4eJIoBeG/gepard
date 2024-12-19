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

	async createHelpRequest(dto: HelpDto, status: string = 'PENDING') {
		try {
			await this.bot.sendMessage(
				this.managerChatId,
				`
				Новая заявка:
				Имя: ${dto.name}
				Email: ${dto.email}
				Телефон: ${dto.phone}
				Статус: ${status}
			`,
				{
					parse_mode: 'HTML'
				}
			)
		} catch (error) {
			console.error('Ошибка отправки сообщения:', error)
		}
	}
}
