import bcrypt from 'bcrypt';
import { loginValidation } from '../../validation';
import { UserModel } from '../../models';
import CustomError from '../../helpers';
import { GenerateToken } from '../../middleware';

const login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    await loginValidation.validate({ phoneNumber, password });
    const user = await UserModel.findOne({ where: { phone_number: phoneNumber }, raw: true });

    if (!user) {
      throw new CustomError(
        400,
        'المستخدم غير موجود',
      );
    }

    const {
      role, id,
    } = user;
    const comparePasswordResult = await bcrypt.compare(password, user.hashed_password);
    if (!comparePasswordResult) {
      throw new CustomError(
        400,
        'كلمة المرور خاطئة',
      );
    }

    GenerateToken({
      phoneNumber, id, role,
    }, res, next);
  } catch (err) {
    next(err);
  }
};

export default login;
