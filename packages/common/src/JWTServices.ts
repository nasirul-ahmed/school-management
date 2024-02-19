import jwt, { JwtPayload, SignOptions, decode } from 'jsonwebtoken';
import { jwtSecret } from './helper';
import { IToken } from './interfaces/IToken';

const generateUserJWT = (tokenData: IToken, expiresIn: SignOptions['expiresIn']) => {
  return jwt.sign(tokenData, jwtSecret, { expiresIn });

};

const verifyUserJWT = (token: string): IToken & JwtPayload => {
  if (!token) return null;

  return <IToken & JwtPayload>jwt.verify(token, jwtSecret);
};

const decodeTokenWithoutVerifying = (token: string): IToken & JwtPayload => <IToken & JwtPayload>decode(token);

export default {
  generateUserJWT,
  verifyUserJWT,
  decodeTokenWithoutVerifying,
};
