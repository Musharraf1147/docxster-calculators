import { Slider as SliderPrimitive } from '@/components/ui/slider'

export default function Slider({
  label,
  helper,
  value,
  min,
  max,
  step,
  onChange,
  formatValue = (v) => v.toString(),
}) {
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex items-center justify-between">
        <span className="text-medium tracking-[-0.4px] text-text-strong font-semibold ">
          {label}
        </span>
        <span className="text-xs tabular-nums text-text-strong bg-bg-primary border border-stroke-weak rounded-md px-md py-2xs">
          {formatValue(value)}
        </span>
      </div>

      <SliderPrimitive
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        aria-label={label}
      />

      {helper && (
        <span className="text-sm font-medium tracking-[-0.2px] text-text-weaker">{helper}</span>
      )}
    </div>
  )
}
