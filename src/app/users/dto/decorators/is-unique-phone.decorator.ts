import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "../../users.service";

@ValidatorConstraint({ async: true })
class IsUniquePhoneConstraint implements ValidatorConstraintInterface {
  async validate(phone: string) {
    const exists = await new UsersService().exists({ phone });
    return !exists;
  }
}

export function IsUniquePhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: "phone must be unique",
        ...validationOptions,
      },
      constraints: [],
      validator: IsUniquePhoneConstraint,
    });
  };
}
