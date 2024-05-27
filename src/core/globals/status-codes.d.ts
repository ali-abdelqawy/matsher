declare global {
  var STATUS_CODES: { [index in "OK" | "CREATED"]: number };
}

export {};
