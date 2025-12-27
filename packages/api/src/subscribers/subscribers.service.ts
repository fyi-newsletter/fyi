import { Injectable, Logger } from '@nestjs/common';
import { SubscriberProps, SubscriptionProps } from '@t5mm/shared';

@Injectable()
export class SubscribersService {

	private readonly logger = new Logger(SubscribersService.name)

	subscribers: SubscriberProps[] = []

	create(email: string): SubscriberProps {
		let subscriber = this.find(email)

		if (!subscriber) {
			const uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);

			subscriber = { uuid, createdAt: new Date(), updatedAt: new Date(), email }
			this.subscribers.push(subscriber)
			// TODO: send verification email
		}

		return subscriber
	}

	find(email): SubscriberProps | undefined {
		return this.subscribers.find(s => s.email === email)
	}

	async findOrCreate(email: string): Promise<SubscriberProps> {
		let subscriber = this.find(email)

		if (!subscriber) {
			subscriber = await this.create(email)
		}

		return subscriber
	}

}
