export abstract class Formatter {
  static date(date: any) {
    return `${date.toDateString()}, ${date.toLocaleTimeString("us")}`;
  }

  static number(num: any) {
    return Number(num).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
