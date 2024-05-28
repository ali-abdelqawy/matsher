import { createParamDecorator } from "routing-controllers";

export function User() {
  return createParamDecorator({
    required: true,
    value: (action) => action.response.locals.user,
  });
}
