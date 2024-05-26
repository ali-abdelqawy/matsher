export abstract class Obj {
  static pick(obj: any, fields: string[]) {
    return fields.reduce((picked: any, field) => ({ ...picked, [field]: obj[field] }), {});
  }
}
