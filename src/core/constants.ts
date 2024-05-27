export const DECIMAL_VALIDATION = {
  options: {
    decimal_digits: "2",
    force_decimal: true,
  },
  on_error_msg: "must be a decimal number with exactly two digits",
};

export const NODE_ENVS = ["LOCAL", "TESTING"] as const;
