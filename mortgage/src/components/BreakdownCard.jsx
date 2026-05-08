import { cn } from '@/lib/utils'

const TAGS = {
  margin:     'bg-tag-margin-bg text-tag-margin-fg border-tag-margin-stroke',
  labor:      'bg-tag-labor-bg text-tag-labor-fg border-tag-labor-stroke',
  suspensions: 'bg-tag-margin-bg text-tag-margin-fg border-tag-margin-stroke',
  cashflow:   'bg-tag-cashflow-bg text-tag-cashflow-fg border-tag-cashflow-stroke',
  compliance: 'bg-tag-disputes-bg text-tag-disputes-fg border-tag-disputes-stroke',
}

export default function BreakdownCard({ tag, label, value, footnote }) {
  return (
    <div className="bg-bg-primary border border-stroke-weak rounded-2xl p-xl shadow-xs flex flex-col gap-lg">
      <span
        className={cn(
          'w-fit rounded-md border px-md py-2xs font-mono font-medium text-xs tracking-[-0.2px]',
          TAGS[tag],
        )}
      >
        {tag}
      </span>
      <span className="flex-1 text-sm font-medium text-text-weak">{label}</span>
      <span className="mt-auto text-xl tracking-[-0.4px] font-semibold tabular-nums text-text-strong">
        {value}
      </span>
      {footnote && (
        <span className="text-[10px] text-text-weaker">{footnote}</span>
      )}
    </div>
  )
}
