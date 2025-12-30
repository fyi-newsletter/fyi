import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubscriptionsRequest } from '@t5mm-com/shared';
import { SubscriptionsService } from './subscriptions.service';
import { SubscribersService } from 'src/subscribers/subscribers.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscribersService: SubscribersService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Post()
  async subscribe(@Body() body: CreateSubscriptionsRequest) {
    for (const newsletter of body.newsletters) {
      await this.subscriptionsService.findOneOrCreate({
        subscriberEmail: body.email,
        newsletter,
      });
    }
  }
}
