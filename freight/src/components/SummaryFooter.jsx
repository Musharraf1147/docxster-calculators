import { formatCurrency } from '@/lib/calculations'

export default function SummaryFooter({
  paybackWeeks,
  roiMultiplier,
  annualNet,
}) {
  const paybackText =
    paybackWeeks === null
      ? '—'
      : paybackWeeks <= 1
        ? 'Under 1 week'
        : `${paybackWeeks} weeks`

  const fillPercent =
    roiMultiplier === null ? 0 : Math.min(100, (roiMultiplier / 10) * 100)

  const multiplierLabel =
    roiMultiplier === null
      ? '10x ROI'
      : `${(Math.round(roiMultiplier * 10) / 10).toFixed(1)}x ROI`

  return (
    <div className="bg-bg-primary border border-stroke-weak rounded-2xl p-xl shadow-xs flex flex-col gap-md">
      <div className="flex items-center justify-between gap-lg">
        <span className="text-sm font-medium text-text-weak">Payback period</span>
        <span className="text-sm font-semibold tracking-[-0.4px] tabular-nums text-text-strong whitespace-nowrap">
          {paybackText}
        </span>
      </div>

      <div className="flex items-center justify-between gap-lg">
        <span className="text-sm font-medium text-text-weak">
          Annual net ROI (after subscription cost)
        </span>
        <span className="text-sm font-semibold tracking-[-0.4px] tabular-nums text-text-strong whitespace-nowrap">
          {formatCurrency(annualNet)} / yr
        </span>
      </div>

      <div className="relative h-4 w-full overflow-hidden rounded-sm bg-bg-page mt-sm">
        <div
          className="absolute inset-y-0 left-0 bg-icon-weak transition-all duration-300 ease-out-expo"
          style={{ width: `${fillPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-text-weaker">0x ROI</span>
        <span className="text-[10px] text-text-weaker">{multiplierLabel}</span>
      </div>
    </div>
  )
}
