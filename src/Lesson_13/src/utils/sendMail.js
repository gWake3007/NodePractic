import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';

const transport = nodemailer.createTransport({
  host: SMTP.SERVER,
  port: SMTP.PORT,
  secure: false,
  auth: {
    user: SMTP.USER,
    pass: SMTP.PASSWORD,
  },
});

export function sendMail(message) {
  //?Сам результат відправлення листа та посилання.
  // console.log(message);
  return transport.sendMail(message);
}
