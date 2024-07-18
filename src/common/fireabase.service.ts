import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

export type FirebaseUser = {
  email: string;
  password: string;
};

export type FirebaseUserClaims = {
  allowedPermissions: string[];
  roleId: number;
};

@Injectable()
export class FirebaseService {
  validateToken(token: string) {
    return admin.auth().verifyIdToken(token);
  }

  createUser(user: FirebaseUser) {
    return admin.auth().createUser(user);
  }

  addCustomClaims(uuid: string, claims: FirebaseUserClaims) {
    return admin.auth().setCustomUserClaims(uuid, claims);
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
