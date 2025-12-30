import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('ip')
export class IpController {
  @Get()
  getClientIp(@Req() req: Request, @Res() res: Response): void {
    let ip = req.ip;

    const xForwardedFor = req.headers['x-forwarded-for'];
    if (typeof xForwardedFor === 'string') {
      ip = xForwardedFor.split(',')[0].trim();
    }

    if (ip === '::1') ip = '127.0.0.1';

    res.setHeader('Content-Type', 'text/plain');
    res.send(ip);
  }
}
