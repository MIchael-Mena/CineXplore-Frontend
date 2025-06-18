export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

// Placeholders BalanceCounter
export const WARNING_LIMIT = 100000
export const CONSUMED_THIS_MONTH = 58000.5

export const ROWS_PER_PAGE = 50
export const DEBOUNCE_TIME = 700

export const passwordValidationRules = {
  minLength: 10,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
}

export const resetPasswordValidationRules = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
  required: true,
}
