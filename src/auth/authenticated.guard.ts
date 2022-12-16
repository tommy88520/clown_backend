import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class authenticatedGuard {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
