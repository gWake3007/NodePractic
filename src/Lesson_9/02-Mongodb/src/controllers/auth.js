import { registerUser, loginUser } from '../services/auth.js';

export async function registerController(req, res) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registeredUser = await registerUser(user);

  res.send({ status: 200, message: 'User registered!', data: registeredUser });
}

export async function loginController(req, res) {
  const { email, password } = req.body;

  const session = await loginUser(email, password);
  //?В консолі можна побачити всі такени і коли вони закунчуються!
  // console.log(session);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  //?Сесія в нас валідна до кінця токену.expires: session.refreshTokenValidUntil тому ми і використовуємо цю опцію.
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Login completed!',
    data: { accessToken: session.accessToken },
  });
}

//?res.cookie('refreshToken', session.refreshToken, { httpOnly: true }); в кукі передаємо refreshToken і в опції вказуємо httpOnly: true щоб кукі передавалися тільки http запитами.
//?expires: session.refreshTokenValidUntil - опція в якій ми вказуємо коли refreshToken закінчується!
