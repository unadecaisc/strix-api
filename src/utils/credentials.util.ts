export function getCredentialsFromEnv() {
  if (process.env.FIREBASE_CREDENTIAL) {
    const base = Buffer.from(
      process.env.FIREBASE_CREDENTIAL,
      'base64',
    ).toString('utf-8');

    const obj = JSON.parse(base);
    return obj;

    
  }
}
