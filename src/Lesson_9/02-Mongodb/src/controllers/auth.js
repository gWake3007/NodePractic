import { registerUser } from '../services/auth.js';

export async function registerController(req, res) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  await registerUser(user);

  res.send('Register');
}
