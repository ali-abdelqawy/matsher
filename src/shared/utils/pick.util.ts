export const pick = (obj: any, props: string[]) =>
  props.reduce((picked: any, prop) => ({ ...picked, [prop]: obj[prop] }), {});
