export abstract class Formatter {
  static number(num: any) {
    return Number(num).toLocaleString("en", {
      maximumFractionDigits: 2,
    });
  }
}
