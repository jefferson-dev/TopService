import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authJwt from '../../config/authJwt';

export default async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: 'Primeiro faça login.' });
  }

  const [, token] = await header.split(' ');

  try {
    const decode = await promisify(jwt.verify)(token, authJwt.secret);
    req.userId = decode.id;

    return next();
  } catch (err) {
    return res.status(401).json({ erro: 'Login inválido' });
  }
};
