import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import { signUpSchema } from '../../validation';
import { UserModel } from '../../models';
import { CustomError } from '../../helpers';

const signUp = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {
      firstName, lastName, phoneNumber, email, password,
    } = await signUpSchema.validate(
      req.body,
      { abortEarly: false },
    );
    const hashedPassword = await hash(password, 10);
    const [created] = await UserModel.findOrCreate({
      where: { phone_number: phoneNumber },
      defaults: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        hashed_password: hashedPassword,
        role: 'user',
      },
    });

    if (!created) {
      throw new CustomError(
        400,
        'Phone Number Already Exist',
      );
    }
    res.json({ message: 'User Created Successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new CustomError(400, err.errors));
    }
    next(err);
  }
};

export default signUp;
