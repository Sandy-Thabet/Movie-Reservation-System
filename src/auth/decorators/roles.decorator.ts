import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'prisma/generated/client';

export const Roles_KEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(Roles_KEY, roles);
