export function getRates() {
  try {
    const raw = import.meta.env.VITE_COUNTRY_RATES
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Invalid VITE_COUNTRY_RATES format, using defaults')
  }
  return { Sweden: 7.35, China: 11.53, Brazil: 15.63, Australia: 50.09 }
}

export function calcShippingCost(weight, country) {
  const rates = getRates()
  const multiplier = rates[country] || 0
  return Number((Number(weight) * multiplier).toFixed(2))
}

export function rgbStringFromHex(hex) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0,2), 16)
  const g = parseInt(h.substring(2,4), 16)
  const b = parseInt(h.substring(4,6), 16)
  return `rgb(${r}, ${g}, ${b})`
}
