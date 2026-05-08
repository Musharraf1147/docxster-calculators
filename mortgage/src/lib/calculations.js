export const DEFAULTS = {
  loans: 100,
  loanamt: 350000,
  dip: 35,
  dayssaved: 2,
  noterate: 0.07,
  ftes: 5,
  rate: 30,
  hrsperloan: 16,
  docchase: 0.40,
  followups: 6,
  incverify: 0.30,
  susprate: 0.10,
  reworkhrs: 4.5,
  complhrs: 1.5,
  cost: 1500,
}

export function calculateROI(inputs) {
  const {
    loans, loanamt, dayssaved, noterate, ftes, rate, hrsperloan,
    docchase, incverify, susprate, reworkhrs, complhrs, cost,
  } = inputs

  const AUTO_SAVE = 0.65
  const SUSP_REDUCTION = 0.70
  const COMPL_AUTO = 0.60

  const teamMonthlyCost = ftes * 160 * rate

  const docChaseSavedRaw   = loans * hrsperloan * docchase * AUTO_SAVE * rate
  const incVerifySavedRaw  = loans * hrsperloan * incverify * AUTO_SAVE * rate
  const suspensionSavedRaw = loans * susprate * reworkhrs * SUSP_REDUCTION * rate
  const complianceSavedRaw = loans * complhrs * COMPL_AUTO * rate

  const totalRaw = docChaseSavedRaw + incVerifySavedRaw +
                   suspensionSavedRaw + complianceSavedRaw
  const capRatio = (teamMonthlyCost > 0 && totalRaw > teamMonthlyCost)
    ? teamMonthlyCost / totalRaw
    : 1

  const docChaseSaved   = docChaseSavedRaw * capRatio
  const incVerifySaved  = incVerifySavedRaw * capRatio
  const suspensionSaved = suspensionSavedRaw * capRatio
  const complianceSaved = complianceSavedRaw * capRatio

  const laborTotal   = docChaseSaved + incVerifySaved
  const monthlyTotal = laborTotal + suspensionSaved + complianceSaved
  const annualNet    = (monthlyTotal * 12) - (cost * 12)

  const hrsFreed = Math.min(
    loans * hrsperloan * (docchase + incverify) * AUTO_SAVE,
    ftes * 160
  )

  const carryCost = loans * loanamt * (noterate / 365) * dayssaved
  const carryAnnual = carryCost * 12

  const currentCPL = loans > 0
    ? (loans * hrsperloan * rate + loans * susprate * reworkhrs * rate) / loans
    : 0
  const savingPerLoan = loans > 0
    ? (laborTotal + suspensionSaved + complianceSaved) / loans
    : 0
  const afterCPL = Math.max(0, currentCPL - savingPerLoan)

  const paybackWeeks = (monthlyTotal > 0 && cost > 0)
    ? Math.round((cost / monthlyTotal) * 4.33)
    : null
  const roiMultiplier = cost > 0 ? monthlyTotal / cost : null

  return {
    docChaseSaved, incVerifySaved, suspensionSaved, complianceSaved,
    laborTotal, monthlyTotal, annualNet,
    hrsFreed, carryCost, carryAnnual,
    currentCPL, afterCPL, savingPerLoan,
    paybackWeeks, roiMultiplier,
    dayssaved,
  }
}

export function formatCurrency(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return '$' + Math.round(n / 1000) + 'K'
  return '$' + Math.round(n).toLocaleString()
}

export function formatHours(n) {
  return Math.round(n).toLocaleString() + ' hrs'
}
