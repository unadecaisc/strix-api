import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '../auth/auth.middleware';

import { SetMetadata } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this._reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest<
      FastifyRequest & {
        raw: AuthenticatedRequest;
      }
    >();

    const firebaseUser = request.raw.firebaseUser;

    const userPermissions = roles.some((role) =>
      firebaseUser.allowedPermissions.includes(role),
    );

    return firebaseUser.allowedPermissions.includes('ADMIN') ?? userPermissions;
  }
}

export function Roles(...roles: string[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
}
