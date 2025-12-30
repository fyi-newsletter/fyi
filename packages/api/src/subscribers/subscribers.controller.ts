import { Body, Controller, Param, Post } from '@nestjs/common';
import { SubscriberProps } from '@t5mm-com/shared';
import { SubscribersService } from 'src/subscribers/subscribers.service';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post('/:uuid/verify')
  async verify(@Param('uuid') uuid: SubscriberProps['uuid']) {
    const subscriber = await this.subscribersService.findOne(uuid);

    if (subscriber?.verifiedAt) return;

    return this.subscribersService.updateOne(uuid, {
      verifiedAt: new Date(),
    });
  }
}
