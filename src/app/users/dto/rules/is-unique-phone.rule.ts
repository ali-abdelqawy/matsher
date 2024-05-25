import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "../../users.schema";

@ValidatorConstraint({ async: true })
class IsUniquePhoneConstraint implements ValidatorConstraintInterface {
  async validate(phone: string) {
    const exists = await User.exists({ phone });
    return !exists;
  }
}

export function IsUniquePhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniquePhoneConstraint,
    });
  };
}
