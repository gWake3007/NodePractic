import mongoose from 'mongoose';

//?studentSchema - Тут вказуємо які поля будуть в нашого студента(Інформація за якого приходить з бази данних Mongodb).
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      default: false,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

//?  onDuty: { type: Boolean, default: false,} - default це значення яке буде за замовченням.
//?timestamps: true - Потрібно щоб mongouse додав автоматично два поля(createdAt, updatedAt).

const Student = mongoose.model('Student', studentSchema);
//Student => (toLowerCase()) => student => (plural) => students(Тобто наша модель буде входити в studens)

export { Student };
