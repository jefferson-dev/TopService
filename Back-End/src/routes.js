import { Router } from 'express';

import UserControll from './app/controllers/UserControll';
import SessionControll from './app/controllers/SessionControll';
import authVerify from './app/middlewares/authVerify';

const routes = new Router();

// Cadastro e Login
routes.post('/register', UserControll.store);
routes.post('/session', SessionControll.store);

// Verificar Login
routes.use(authVerify);

// Atualização e Delete do usuário
routes.put('/user', UserControll.update);
routes.delete('/user', UserControll.destroy);

export default routes;
