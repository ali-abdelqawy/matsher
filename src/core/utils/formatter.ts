export abstract class Formatter {
  static date(date: any) {
    return `${date.toDateString()}, ${date.toLocaleTimeString("us")}`;
  }

  static number(num: any) {
    return Number(num).toLocaleString("en", {
      maximumFractionDigits: 2,
    });
  }
}
