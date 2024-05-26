import { CookieOptions, Response } from "express";

export abstract class HttpCookie {
  private static enableHttps = !["LOCAL", "TESTING"].includes(process.env.NODE_ENV);
  private static options: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    ...(this.enableHttps && {
      secure: true,
    }),
  };

  static set(name: string, payload: string, res: Response) {
    res.cookie(name, payload, this.options);
  }

  static clear(name: string, res: Response) {
    res.clearCookie(name);
  }
}
