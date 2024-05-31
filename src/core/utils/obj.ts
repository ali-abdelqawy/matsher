export abstract class Obj {
  static pick(obj: any, fields: string[]) {
    return fields.reduce((picked: any, field) => ({ ...picked, [field]: obj[field] }), {});
  }

  static omit(obj: any, fields: string[]) {
    return Object.keys(obj)
      .filter((key) => !fields.includes(key))
      .reduce((filtered, key) => ({ ...filtered, [key]: obj[key] }), {});
  }
}
