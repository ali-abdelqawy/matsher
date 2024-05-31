import { registerDecorator, ValidationOptions } from "class-validator";
import { PasswordChecker } from "../../../../core/utils";

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isStrongPassword",
      target: object.constructor,
      propertyName,
      options: {
        message:
          "password must be strong, you can generate a strong one using this website: https://passwordsgenerator.net/",
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return typeof value === "string" && PasswordChecker.check(value).score === 4;
        },
      },
    });
  };
}
