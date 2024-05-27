import { createParamDecorator } from "routing-controllers";
import { LoggedUser } from "../../app/users";

export function User() {
  return createParamDecorator({
    required: true,
    value: (action) => action.response.locals.user as LoggedUser,
  });
}
