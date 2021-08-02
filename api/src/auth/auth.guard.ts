import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const decodedUser = await this.authService.validateRequest(request);

    if (decodedUser) {
      request.user = decodedUser;
    }

    return decodedUser;
  }
}
