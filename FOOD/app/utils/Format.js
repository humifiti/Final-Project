
export const formatNumber = number => {
  try {
    const numberFormat = Math.round(parseFloat(number))
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    return numberFormat
  } catch (error) {
    return 0
  }
}

export const formatPrice = value => {
  // return value
  return Intl.NumberFormat().format(value)
}
