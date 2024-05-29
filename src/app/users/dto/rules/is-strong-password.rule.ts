import { registerDecorator, ValidationOptions } from "class-validator";
import { PasswordChecker } from "../../../../core/utils";

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isStrongPassword",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === "string" && PasswordChecker.check(value).score === 4;
        },
      },
    });
  };
}
