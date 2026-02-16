import { Body, Controller, Logger, Param, Post } from '@nestjs/common';
import { SubscriberProps } from '@fyi-newsletter/shared';
import { SubscribersService } from 'src/subscribers/subscribers.service';

import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';

const templatePath = path.join(
  __dirname,
  '../assets/email-templates/confirm-signup.html',
);

const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

@Controller('subscribers')
export class SubscribersController {
  private readonly logger = new Logger(SubscribersController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly subscribersService: SubscribersService,
    private readonly emailService: EmailService,
  ) {}

  @Post('/:uuid/verify')
  async verify(@Param('uuid') uuid: SubscriberProps['uuid']) {
    const subscriber = await this.subscribersService.findOne(uuid);

    if (subscriber?.verifiedAt) return;

    return this.subscribersService.updateOne(uuid, {
      verifiedAt: new Date(),
    });
  }

  @Post('/:email/send-verification')
  async sendVerificationEmail(@Param('email') email: SubscriberProps['email']) {
    const subscriber = await this.subscribersService.findOne(email);

    if (!subscriber) {
      this.logger.log(
        `Subscriber with email: ${email} does not exist. Cannot send verification email.`,
      );
      return;
    }

    this.logger.log(`Sending verification email for subscriber to: ${email}.`);

    const wwwHost = this.configService.get<string>('WWW_HOST');
    const confirmSignupLink = `${wwwHost}/subscribers/verify?token=${subscriber.uuid}`;
    const manageSubscriptionsLink = `${wwwHost}/manage-subscriptions?token=${subscriber.uuid}`;

    const htmlBody = emailTemplate
      .replace(/{{confirmSignupLink}}/g, confirmSignupLink)
      .replace(/{{manageSubscriptionsLink}}/g, manageSubscriptionsLink);

    await this.emailService.send({
      to: [{ email: subscriber.email, name: '' }],
      subject: 'Confirm your FYI subscription (5 seconds)',
      htmlBody,
    });

    /// TODO send verification email
  }
}
