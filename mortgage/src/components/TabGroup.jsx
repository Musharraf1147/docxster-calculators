import { useId } from 'react'

import {
  Tabs,
  TabsList,
  TabsTab,
} from '@/components/animate-ui/components/base/tabs'

export default function TabGroup({ label, helper, options, value, onChange }) {
  const labelId = useId()

  return (
    <div className="flex flex-col gap-sm">
      {label && (
        <span
          id={labelId}
          className="text-medium tracking-[-0.4px] text-text-strong font-semibold"
        >
          {label}
        </span>
      )}

      <Tabs value={value} onValueChange={onChange}>
        <TabsList
          aria-labelledby={label ? labelId : undefined}
          className="w-full"
        >
          {options.map((opt) => (
            <TabsTab key={String(opt.value)} value={opt.value}>
              {opt.label}
            </TabsTab>
          ))}
        </TabsList>
      </Tabs>

      {helper && (
        <span className="text-sm font-medium tracking-[-0.2px] text-text-weaker">{helper}</span>
      )}
    </div>
  )
}
