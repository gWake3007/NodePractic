import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

//?За допомогою цього скрипта робимо так щоб у відповіді при створенні юзера не відображався пароль!

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

export { User };

//?unique: true, - говорить про те що це поле має бути Унікальним. Тобто не має повторюватись в базі!
//?versionKey: false - відміна в mongoose поля __v (використовується для відстеження версій документа під час оновлення).
//?timestamps: true - для створення полів createdAt: дата та час створення документа,updatedAt: дата та час останнього оновлення документа.
