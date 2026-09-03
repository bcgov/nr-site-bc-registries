import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ForbiddenException } from '@nestjs/common';
import { URL } from 'url';

@Catch(HttpException)
export class AccountFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const protocol = process.env.site_environment == 'DEVELOPMENT' ? 'http://' : 'https://';
    const url = new URL(protocol + request.headers.host + response.req.url);
    const status = exception.getStatus();
    response.status(status).redirect(url.origin);
  }
}
