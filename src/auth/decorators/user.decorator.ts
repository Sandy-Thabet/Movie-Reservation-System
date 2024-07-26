import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'prisma/generated/client';

export const GetUser = createParamDecorator((_data: any, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  return req.user as User;
});
