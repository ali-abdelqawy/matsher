import { Request, Response } from "express";
import { ValidationError } from "class-validator";
import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";

@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, _req: Request, res: Response) {
    const status = error?.status || error?.httpCode || 500;
    const VALIDATION_ERRORS_TAIL = "check 'errors' property for more info.";
    if (error?.message.endsWith(VALIDATION_ERRORS_TAIL)) {
      return res.status(status).send({
        errors: this.formatValidationErrors(error.errors),
      });
    }
    return res.status(status).send({
      message: this.formatErrorMessage(error.name, error.message),
    });
  }

  formatValidationErrors(validationErrors: ValidationError[]) {
    const errors: any = {};
    validationErrors.forEach((error: ValidationError) => {
      errors[error.property] = error.constraints
        ? Object.values(error.constraints!).toReversed()
        : this.formatValidationErrors(error.children!);
    });
    return errors;
  }

  formatErrorMessage(errorName: string, errorMessage: string) {
    let message = "";
    switch (errorName) {
      case "HttpException":
        message = errorMessage;
        break;
      case "SyntaxError":
        message = "Request body is not valid JSON";
        break;
      default:
        console.log(errorMessage);
        message = "Something went wrong";
        break;
    }
    return message;
  }
}
