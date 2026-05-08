import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

export default function MetricCard({ label, value, caption, emphasized = false }) {
  return (
    <div
      className={cn(
        'min-w-0 rounded-xl p-xl shadow-xs flex flex-col gap-sm',
        emphasized
          ? 'bg-primary-btn border border-stroke-strong'
          : 'bg-bg-primary border border-stroke-weak',
      )}
    >
      <motion.span
        key={String(value)}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 0.3, times: [0, 0.5, 1] }}
        className={cn(
          'origin-left inline-block text-xl font-semibold tabular-nums whitespace-nowrap',
          emphasized ? 'text-white' : 'text-text-strong',
        )}
      >
        {value}
      </motion.span>
      <span
        className={cn(
          'text-sm font-semibold',
          emphasized ? 'text-white/80' : 'text-text-strong',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'text-xs font-medium',
          emphasized ? 'text-white/60' : 'text-text-weaker',
        )}
      >
        {caption || ' '}
      </span>
    </div>
  )
}
