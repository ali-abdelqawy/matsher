import { IsNotEmpty, IsOptional, ValidationOptions } from "class-validator";

export function IsRequired(isRequired: boolean, validationOptions?: ValidationOptions) {
  return isRequired ? IsNotEmpty(validationOptions) : IsOptional(validationOptions);
}
