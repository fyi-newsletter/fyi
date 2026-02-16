import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import {
  CreateSubscriptionsRequest,
  UpdateSubscriptionsRequest,
} from '@readfyi/shared';
import { SubscriptionsService } from './subscriptions.service';
import { SubscribersService } from 'src/subscribers/subscribers.service';
import { NewsletterEnum } from '@readfyi/shared';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscribersService: SubscribersService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Get()
  async getSubscriptions(@Query('subscriberUuid') subscriberUuid: string) {
    if (!subscriberUuid) return;
    return this.subscriptionsService.findBySubscriberUuid(subscriberUuid);
  }

  @Put()
  async updateSubscriptions(
    // @Query('subscriberUuid') subscriberUuid: string,
    @Body() body: UpdateSubscriptionsRequest,
  ) {
    const missingNewsletters = Object.values(NewsletterEnum).filter(
      (n) => !body.newsletters.includes(n),
    );

    for (const newsletter of missingNewsletters) {
      await this.subscriptionsService.delete({
        subscriberUuid: body.subscriberUuid,
        newsletter,
      });
    }

    console.log(missingNewsletters);

    for (const newsletter of body.newsletters) {
      await this.subscriptionsService.findOneOrCreate({
        subscriberUuid: body.subscriberUuid,
        newsletter,
      });
    }
  }

  @Post()
  async subscribe(@Body() body: CreateSubscriptionsRequest) {
    const subscriber = await this.subscribersService.findOneOrCreate(
      body.email,
    );

    for (const newsletter of body.newsletters) {
      await this.subscriptionsService.findOneOrCreate({
        subscriberUuid: subscriber.uuid,
        newsletter,
      });
    }
  }
}
