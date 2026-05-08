import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative grow h-4 overflow-hidden rounded-sm bg-bg-page">
      <SliderPrimitive.Range className="absolute h-full bg-icon-weak" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        'group flex items-center justify-center',
        'w-4 h-8 bg-bg-primary outline-none',
        'data-[disabled]:cursor-not-allowed',
      )}
    >
      <span
        className={cn(
          'block w-2 h-6 rounded-sm border-[1.5px] border-icon-weak bg-bg-primary shadow-xs',
          'transition-all duration-150 ease-out-expo',
          'group-hover:w-2.5 group-hover:h-7 group-hover:shadow-sm',
          'group-active:w-3 group-active:h-8 group-active:shadow-md',
          'group-focus-visible:outline-2 group-focus-visible:outline-stroke-strong group-focus-visible:outline-offset-2',
        )}
      />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
