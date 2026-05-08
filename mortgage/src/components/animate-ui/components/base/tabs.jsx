import * as React from 'react'
import { LayoutGroup, motion } from 'motion/react'

import { cn } from '@/lib/utils'

const TabsContext = React.createContext(null)

function useTabs() {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('Tabs.* must be used within <Tabs>')
  return ctx
}

function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  ...props
}) {
  const [internal, setInternal] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal
  const groupId = React.useId()

  const setValue = React.useCallback(
    (next) => {
      if (!isControlled) setInternal(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange],
  )

  return (
    <TabsContext.Provider value={{ value: current, setValue, groupId }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  const { groupId } = useTabs()
  const innerRef = React.useRef(null)

  function setRef(el) {
    innerRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }

  function handleKeyDown(e) {
    const tabs = Array.from(
      innerRef.current?.querySelectorAll('[role="tab"]') ?? [],
    )
    const idx = tabs.indexOf(document.activeElement)
    if (idx === -1) return

    let next = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % tabs.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1

    if (next !== null) {
      e.preventDefault()
      tabs[next].focus()
    }
  }

  return (
    <LayoutGroup id={groupId}>
      <div
        ref={setRef}
        role="tablist"
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center gap-xs p-xs bg-bg-page border border-stroke-weak rounded-[10px]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </LayoutGroup>
  )
})
TabsList.displayName = 'TabsList'

const TabsTab = React.forwardRef(
  ({ value, className, children, ...props }, ref) => {
    const { value: activeValue, setValue } = useTabs()
    const isActive = activeValue === value

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onClick={() => setValue(value)}
        className={cn(
          'relative flex-1 px-lg py-sm text-sm tracking-[-0.2px] rounded-md transition-colors duration-150 ease-out-expo',
          isActive ? 'text-text-strong font-semibold' : 'text-text-weak font-medium hover:text-text-strong',
          'focus-visible:outline-2 focus-visible:outline-stroke-strong focus-visible:outline-offset-2',
          className,
        )}
        {...props}
      >
        {isActive && (
          <motion.span
            layoutId="tabs-indicator"
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-bg-primary border border-stroke-weak shadow-xs rounded-md"
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)
TabsTab.displayName = 'TabsTab'

export { Tabs, TabsList, TabsTab }
