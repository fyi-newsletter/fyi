import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OmitBase, SubscriberProps } from '@t5mm-com/shared';
import { SubscribersEntity } from './subscribers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribersService {

	private readonly logger = new Logger(SubscribersService.name)

	constructor(
		@InjectRepository(SubscribersEntity)
		private subscribersRepository: Repository<SubscribersEntity>,
	) { }

	subscribers: SubscriberProps[] = []

	create(subscriber: OmitBase<SubscriberProps>): SubscriberProps {
		this.logger.log(`Creating subscriber: ${subscriber}`)
		return this.subscribersRepository.save(subscriber)
		// let subscriber = this.find(email)

		// if (!subscriber) {
		// 	const uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);

		// 	subscriber = { uuid, createdAt: new Date(), updatedAt: new Date(), email }
		// 	this.subscribers.push(subscriber)
		// 	// TODO: send verification email
		// }

		// return subscriber
	}

	find(email): SubscriberProps | undefined {
		return this.subscribers.find(s => s.email === email)
	}

	async findOrCreate(email: string): Promise<SubscriberProps> {
		let subscriber = this.find(email)

		if (!subscriber) {
			subscriber = await this.create({ email })
		}

		return subscriber
	}

}
