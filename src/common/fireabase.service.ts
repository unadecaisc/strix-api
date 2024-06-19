import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

export type FirebaseUser = {
  email: string;
  password: string;
};

@Injectable()
export class FirebaseService {
  validateToken(token: string) {
    return admin.auth().verifyIdToken(token);
  }

  createUser(user: FirebaseUser) {
    return admin.auth().createUser(user);
  }

  getUser(uid: string) {
    return admin.auth().getUser(uid);
  }

  updateUser(uid: string, user: FirebaseUser) {
    return admin.auth().updateUser(uid, user);
  }

  deleteUser(uid: string) {
    return admin.auth().deleteUser(uid);
  }
}
