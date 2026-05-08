export default function SummaryFooter({
  paybackWeeks,
  roiMultiplier,
}) {
  const paybackText =
    paybackWeeks === null
      ? '—'
      : paybackWeeks <= 1
        ? 'Under 1 week'
        : `${paybackWeeks} weeks`

  const fillPercent =
    roiMultiplier === null ? 0 : Math.min(100, (roiMultiplier / 10) * 100)

  const perDollar =
    roiMultiplier === null ? '0.00' : roiMultiplier.toFixed(2)

  return (
    <div className="bg-bg-primary border border-stroke-weak rounded-2xl p-xl shadow-xs flex flex-col gap-lg">
      <div className="flex items-center justify-between gap-lg">
        <div className="flex items-center gap-md">
          <span className="text-sm font-semibold text-text-strong whitespace-nowrap">
            ROI multiplier
          </span>
          <span className="rounded-sm bg-bg-page px-md py-2xs text-sm font-semibold tracking-[-0.4px] tabular-nums text-text-strong whitespace-nowrap">
            {roiMultiplier === null ? '—' : `${roiMultiplier.toFixed(1)}x ROI`}
          </span>
        </div>
        <div className="flex items-center gap-md">
          <span className="text-xs font-medium text-text-weaker whitespace-nowrap">
            Payback period
          </span>
          <span className="rounded-sm bg-bg-primary border border-stroke-weak px-md py-2xs text-xs font-semibold tracking-[-0.4px] text-text-strong whitespace-nowrap">
            {paybackText}
          </span>
        </div>
      </div>

      <div className="relative h-4 w-full overflow-hidden rounded-sm bg-bg-page">
        <div
          className="absolute inset-y-0 left-0 bg-icon-weak transition-all duration-300 ease-out-expo"
          style={{ width: `${fillPercent}%` }}
        />
      </div>

      <p className="text-xs font-medium text-text-weaker">
        Every $1 spent on Docxster returns ${perDollar} in monthly value.
      </p>
    </div>
  )
}
