import * as yup from 'yup';
import User from '../models/User';

class UserControll {
  async store(req, res) {
    const schema = yup.object().shape({
      fist_name: yup.string().required(),
      last_name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'E-email já está em uso.' });
    }

    const { id, fist_name, last_name, email, provider } = await User.create(
      req.body
    );
    return res.json({
      id,
      fist_name,
      last_name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      fist_name: yup.string(),
      last_name: yup.string(),
      email: yup.string().email(),
      password: yup.string().min(6),
      oldPassword: yup
        .string()
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      passwordVerify: yup
        .string()
        .when('password', (password, field) =>
          password ? field.required().oneOf([yup.ref('password')]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'E-email já está em uso.' });
      }
    }

    if (oldPassword && !(await user.checkPass(oldPassword))) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const { id, fist_name, last_name, provider } = await user.update(req.body);

    return res.json({
      id,
      fist_name,
      last_name,
      email,
      provider,
    });
  }

  async destroy(req, res) {
    const user = await User.findByPk(req.userId);

    await user.destroy(user);

    return res.json({ msg: 'Conta deletada com sucesso.' });
  }
}

export default new UserControll();
