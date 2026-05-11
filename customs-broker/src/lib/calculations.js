export const DEFAULTS = {
  entries: 800,
  docs: 5,
  ftes: 6,
  rate: 35,
  timeMin: 50,
  chasePct: 0.25,
  errRate: 0.10,
  remediate: 350,
  hsRate: 0.02,
  hsDelta: 400,
  ocean: 300,
  isfRate: 0.02,
  cost: 1500,
}

export function calculateROI(inputs) {
  const {
    entries, ftes, rate, timeMin, chasePct, errRate, remediate,
    hsRate, hsDelta, ocean, isfRate, cost,
  } = inputs

  const teamMonthlyCost = ftes * 160 * rate
  const extractSavedRaw = (entries * timeMin / 60) * 0.65 * rate
  const chaseSavedRaw   = ftes * 160 * chasePct * rate
  const laborRaw        = extractSavedRaw + chaseSavedRaw
  const laborCapRatio   = (teamMonthlyCost > 0 && laborRaw > teamMonthlyCost)
    ? teamMonthlyCost / laborRaw
    : 1
  const extractSaved  = extractSavedRaw * laborCapRatio
  const chaseSaved    = chaseSavedRaw * laborCapRatio
  const validateSaved = entries * errRate * remediate
  const hsSaved       = entries * hsRate * hsDelta

  const laborTotal  = extractSaved + chaseSaved
  const errorTotal  = validateSaved + hsSaved
  const monthlyROI  = laborTotal + errorTotal
  const annualNet   = (monthlyROI * 12) - (cost * 12)

  const isfAnnual    = ocean * isfRate * 5000 * 12
  const dutyAnnual   = entries * hsRate * hsDelta * 12
  const cf28Monthly  = entries * errRate * 3 * rate
  const riskTotal    = isfAnnual + dutyAnnual
  const riskReduced  = riskTotal * 0.85

  const paybackWeeks = (monthlyROI > 0 && cost > 0)
    ? Math.round((cost / monthlyROI) * 4.33)
    : null
  const roiMultiplier = cost > 0 ? monthlyROI / cost : null

  return {
    extractSaved, chaseSaved, validateSaved, hsSaved,
    laborTotal, errorTotal,
    monthlyROI, annualNet,
    isfAnnual, dutyAnnual, cf28Monthly, riskTotal, riskReduced,
    paybackWeeks, roiMultiplier,
  }
}

export function formatCurrency(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `$${Math.round(n / 1_000)}K`
  return `$${Math.round(n).toLocaleString()}`
}

export function formatPercent(n) {
  return `${Math.round(n * 100)}%`
}
