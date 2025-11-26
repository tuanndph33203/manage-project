export const formatCurrency = (value: number): string => {
  const language = 'vi'
  const currency = 'VND'
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency
  }).format(value)
}
