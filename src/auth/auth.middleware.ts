import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as admin from 'firebase-admin';

export type AuthenticatedRequest = FastifyRequest['raw'] & {
  firebaseUser: admin.auth.DecodedIdToken;
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private getTokenFromHeader(req: FastifyRequest['raw']) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException('No authorization header provided');
    }
    return req.headers.authorization.split(' ')[1];
  }

  async use(
    req: FastifyRequest['raw'],
    res: FastifyReply['raw'],
    next: () => void,
  ) {
    try {
      const token = this.getTokenFromHeader(req);

      const decoded = await admin.auth().verifyIdToken(token);
      req['fireabseUser'] = decoded;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
