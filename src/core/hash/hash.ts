import { compare, hash } from "bcrypt";

export abstract class Hash {
  private static saltRounds = 10;

  static async hash(plain: string) {
    return hash(plain, this.saltRounds);
  }

  static async compare(plain: string, hash: string) {
    return compare(plain, hash);
  }
}
