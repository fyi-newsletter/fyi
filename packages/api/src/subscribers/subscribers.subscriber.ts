import { EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { SubscribersEntity } from './subscribers.entity';
import { EmailService } from '../email/email.service';
import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

const templatePath = path.join(
  __dirname,
  '../assets/email-templates/confirm-signup.html',
);

const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

@Injectable()
export class SubscribersSubscriber implements EntitySubscriberInterface<SubscribersEntity> {
  constructor(private readonly emailService: EmailService) {}

  listenTo() {
    return SubscribersEntity;
  }

  async afterInsert(event: InsertEvent<SubscribersEntity>) {
    const wwwHost = process.env.WWW_HOST;
    const confirmSignupLink = `${wwwHost}/subscribers/verify?token=${event.entity.uuid}`;
    const manageSubscriptionsLink = `${wwwHost}/manage-subscriptions?token=${event.entity.uuid}`;

    const htmlBody = emailTemplate
      .replace(/{{confirmSignupLink}}/g, confirmSignupLink)
      .replace(/{{manageSubscriptionsLink}}/g, manageSubscriptionsLink);

    await this.emailService.send({
      to: [{ email: event.entity.email, name: '' }],
      subject: 'Confirm your FYI subscription (5 seconds)',
      htmlBody,
    });
  }
}
