import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import User from '../models/User';

import authJwt from '../../config/authJwt';

class SessionControll {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'E-mail não existe.' });
    }

    if (!(await user.checkPass(password))) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const { id, fist_name } = user;

    return res.json({
      user: {
        id,
        fist_name,
        email,
      },
      token: jwt.sign({ id }, authJwt.secret, {
        expiresIn: authJwt.expiresIn,
      }),
    });
  }
}

export default new SessionControll();
