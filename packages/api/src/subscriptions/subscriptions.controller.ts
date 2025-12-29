import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubscriptionsRequest } from '@t5mm-com/shared';
import { SubscriptionsService } from './subscriptions.service';
import { SubscribersService } from 'src/subscribers/subscribers.service';

// interface CreateSubscription {
// 	email: string
// 	newsletters: NewsletterEnum[]
// }

@Controller('subscriptions')
export class SubscriptionsController {

	constructor(private readonly subscribersService: SubscribersService, private readonly subscriptionsService: SubscriptionsService) { }

	@Post()
	async subscribe(@Body() body: CreateSubscriptionsRequest) {
		const subscriber = await this.subscribersService.findOrCreate(body.email)
		// console.log('body', body)
		// return body

		for (const newsletter of body.newsletters) {
			await this.subscriptionsService.findOrCreate(subscriber.uuid, newsletter)
		}
	}
}
