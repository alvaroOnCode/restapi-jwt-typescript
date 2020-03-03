import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string,
    password: string,
    comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    }
});

userSchema.pre<IUser>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
      return next();
  }

  const salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

export default model<IUser>('User', userSchema);