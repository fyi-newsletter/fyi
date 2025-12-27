import { Injectable, Logger } from '@nestjs/common';
import { CreateSubscriptionsRequest, NewsletterEnum, SubscriberProps, SubscriptionProps } from '@t5mm/shared';
import { SubscribersService } from 'src/subscribers/subscribers.service';

@Injectable()
export class SubscriptionsService {

	private readonly logger = new Logger(SubscriptionsService.name)

	subscriptions: SubscriptionProps[] = []

	// constructor(
	// 	@InjectRepository(UsersEntity)
	// 	private usersRepository: Repository<UsersEntity>,
	// ) { }

	// constructor(private readonly subscribersService: SubscribersService) { }

	// async subscribe(body: CreateSubscriptionsRequest) {

	// 1. Create subscriber if it does not exist + send verification link

	// 2. Add newsletters to subscriber
	// }

	create(subscriberUuid: SubscriberProps['uuid'], newsletter: NewsletterEnum) {
		let subscription = this.subscriptions.find(s => s.subscriberUuid === subscriberUuid && s.newsletter === newsletter)

		if (!subscription) {
			const uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);

			subscription = { uuid, createdAt: new Date(), updatedAt: new Date(), subscriberUuid, newsletter }
			this.subscriptions.push(subscription)
			// TODO: send verification email
		}

		return subscription
	}

}
