import { Body, Controller, Post } from '@nestjs/common';
import {
  TrackingCapiFactoryService,
  TrackingEventDto,
  TrackingIntegrationProps,
  TrackingPlatformEnum,
} from '@t5mm-com/tracking';
import { ConfigService } from '@nestjs/config';
import { getBaseProps } from '@t5mm-com/shared';

@Controller()
export class AppController {
  conversionsApiFactoryService = new TrackingCapiFactoryService();

  trackingIntegrations: TrackingIntegrationProps[];

  constructor(private readonly configService: ConfigService) {
    this.trackingIntegrations = [
      {
        ...getBaseProps(),
        platform: TrackingPlatformEnum.Meta,
        pixel: {
          id: this.configService.get<string>('META_PIXEL_ID') || '',
        },
        capi: {
          accessToken:
            this.configService.get<string>('META_CAPI_ACCESS_TOKEN') || '',
        },
      },
    ];
  }

  @Post('/track')
  track(@Body() body: TrackingEventDto) {
    const capiConfigs = this.trackingIntegrations.filter((i) => i.capi) || [];

    const capiIntegrations = capiConfigs.map((config) =>
      this.conversionsApiFactoryService.create(config),
    );

    capiIntegrations.forEach((service) => service.track(body.event, body.data));
  }
}
