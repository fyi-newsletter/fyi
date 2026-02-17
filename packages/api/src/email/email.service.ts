import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isValidEmail } from '@readfyi/shared';
import { isProdLike } from '@readfyi/shared';
import { SendMailClient } from 'zeptomail';

interface SendEmailParams {
  to: { email: string; name: string }[];
  subject: string;
  htmlBody: string;
  plainTextContent?: string;
  cc?: { email: string; name: string }[];
  bcc?: { email: string; name: string }[];
  attachments?: { name: string; content: string }[]; // content in base64
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private zeptoClient: SendMailClient;

  constructor(private readonly configService: ConfigService) {
    this.zeptoClient = new SendMailClient({
      url: 'api.zeptomail.eu/',
      token: this.configService.get<string>('ZEPTO_API_KEY'),
    });
  }

  send(params: SendEmailParams) {
    if (!isProdLike()) {
      this.logger.log(
        'Current environment is not production-like. Email will not be sent but only logged.',
      );
      this.logger.log(params);
      return;
    }

    this.logger.log('Sending email...');
    this.logger.log(params);

    return this.zeptoClient.sendMail({
      from: {
        address: 'newsletter@readfyi.com',
        name: 'FYI Newsletter',
      },
      to: params.to.map((to) => ({
        email_address: { address: to.email, name: to.name },
      })),
      subject: params.subject,
      htmlBody: params.htmlBody,
      cc: params.cc?.map((cc) => ({
        email_address: { address: cc.email, name: cc.name },
      })),
      bcc: params.bcc?.map((bcc) => ({
        email_address: { address: bcc.email, name: bcc.name },
      })),
      attachments: params.attachments?.map((att) => ({
        name: att.name,
        content: att.content,
      })),
    });
  }

  async isValid(email: string) {
    return isValidEmail(email);
  }
}
