import { Body, Controller, Get, Param } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('/:email/is-valid')
  async isValid(@Param('email') email: string) {
    const isValid = await this.emailService.isValid(email);
    return { isValid };
  }

  @Get('/is-valid')
  async isValidEmails(@Body() body: { emails: string[] }) {
    const checks = await Promise.all(
      body.emails.map((e) => this.emailService.isValid(e)),
    );

    const trues = checks.filter((c) => c === true).length;
    const falses = checks.filter((c) => c === false).length;

    return { trues, falses, checks };
  }
}
