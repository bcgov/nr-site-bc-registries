import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AccountGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { session? } = context.switchToHttp().getRequest();
    if (request.session.data.activeAccount == undefined) {
      throw new ForbiddenException('No account selected');
    } else {
      return true;
    }
  }
}
