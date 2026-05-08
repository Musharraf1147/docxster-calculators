export const DEFAULTS = {
  loads:              500,
  invoiceValue:       1800,
  billingVolume:      50000,
  overbillRate:       0.10,
  overchargeAmount:   120,
  manuallyCaughtRate: 0.20,
  docsPerLoad:        4,
  docTimeMinutes:     18,
  opsStaffFTEs:       5,
  hourlyRate:         28,
  podLagDays:         3,
  disputeRate:        0.10,
  disputeHours:       3.5,
  subscriptionCost:   1500,
}

export function calculateROI(inputs) {
  const {
    loads,
    billingVolume,
    overbillRate,
    overchargeAmount,
    manuallyCaughtRate,
    docTimeMinutes,
    hourlyRate,
    disputeRate,
    disputeHours,
    podLagDays,
    subscriptionCost,
  } = inputs

  const overbilledLoads    = loads * overbillRate
  const totalOverbilling   = overbilledLoads * overchargeAmount
  const currentlyCaught    = totalOverbilling * manuallyCaughtRate
  const overbillRecovered  = totalOverbilling - currentlyCaught

  const docLaborSaved      = (loads * docTimeMinutes / 60) * 0.65 * hourlyRate
  const disputeTimeSaved   = loads * disputeRate * disputeHours * hourlyRate * 0.70
  const totalLaborSaved    = docLaborSaved + disputeTimeSaved

  const cashFlowFreed      = (billingVolume / 30) * podLagDays
  const podOpportunityCost = cashFlowFreed * 0.06

  const monthlyROI         = overbillRecovered + totalLaborSaved
  const annualNet          = (monthlyROI * 12) - (subscriptionCost * 12)

  const paybackWeeks =
    monthlyROI === 0 || subscriptionCost === 0
      ? null
      : Math.round((subscriptionCost / monthlyROI) * 4.33)

  const roiMultiplier =
    monthlyROI === 0 || subscriptionCost === 0
      ? null
      : monthlyROI / subscriptionCost

  const hoursReturned =
    (loads * docTimeMinutes / 60 * 0.65) +
    (loads * disputeRate * disputeHours * 0.70)

  return {
    overbilledLoads,
    totalOverbilling,
    currentlyCaught,
    overbillRecovered,
    docLaborSaved,
    disputeTimeSaved,
    totalLaborSaved,
    cashFlowFreed,
    podOpportunityCost,
    monthlyROI,
    annualNet,
    paybackWeeks,
    roiMultiplier,
    hoursReturned,
  }
}

export function formatCurrency(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`
  return `$${Math.round(n).toLocaleString()}`
}

export function formatHours(n) {
  return `${Math.round(n)} hrs/mo`
}

export function formatPercent(n) {
  return `${Math.round(n * 100)}%`
}
