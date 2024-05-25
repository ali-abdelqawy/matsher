import { sign, decode, verify, JwtPayload, Algorithm } from "jsonwebtoken";

export abstract class JWT {
  private static secret = process.env.JWT_SECRET;
  private static algorithm: Algorithm = process.env.JWT_ALGORITHM;

  public static encrypt(options: { payload: object; expiresIn: string }) {
    const { payload, expiresIn } = options;
    const signature = sign(payload, this.secret, {
      header: { alg: this.algorithm },
      expiresIn,
    });
    return signature;
  }

  public static decrypt(token: string) {
    return decode(token) as JwtPayload;
  }

  public static verify(options: { token: string; ignoreExpiration: boolean }) {
    const { token, ignoreExpiration } = options;
    return verify(token, this.secret, {
      algorithms: [this.algorithm],
      ignoreExpiration,
    }) as JwtPayload;
  }
}
