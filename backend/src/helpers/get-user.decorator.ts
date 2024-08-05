import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/users.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
  },
);
