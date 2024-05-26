import { CookieOptions, Response } from "express";
import dayjs, { ManipulateType } from "dayjs";
export abstract class HttpCookie {
  private static enableHttps = !["LOCAL", "TESTING"].includes(process.env.NODE_ENV);
  private static options: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    ...(this.enableHttps && {
      secure: true,
    }),
  };

  static set(name: string, payload: string, res: Response, expiresIn: string) {
    const [value, unit] = expiresIn.split(" ");
    res.cookie(name, payload, {
      ...this.options,
      expires: dayjs()
        .add(Number(value), unit as ManipulateType)
        .toDate(),
    });
  }

  static clear(name: string, res: Response) {
    res.clearCookie(name);
  }
}
