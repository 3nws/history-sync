import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {}

@Injectable()
export class EmailPassAuthGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { email, password } = {
      email: request.headers['email'],
      password: request.headers['password'],
    };
    const user = await this.usersService.findOne(email);
    return user && (await bcrypt.compare(password, user.password));
  }
}
