import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import ConfigPanel from './components/ConfigPanel'
import ResultsPanel from './components/ResultsPanel'
import Header from './components/Header'
import { DEFAULTS, calculateROI } from '@/lib/calculations'

export default function App() {
  const [inputs, setInputs] = useState(DEFAULTS)
  const [toastVisible, setToastVisible] = useState(false)
  const results = useMemo(() => calculateROI(inputs), [inputs])

  function handleChange(key, value) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  function handleReset() {
    setInputs(DEFAULTS)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2000)
  }

  return (
    <div className="min-h-screen bg-bg-primary font-sans">
      <Header onReset={handleReset} />

      <section className="max-w-[1320px] mx-auto px-2xl py-2xl">
        <div className="grid grid-cols-1 min-[960px]:grid-cols-[520px_1fr] gap-y-2xl gap-x-[80px] items-start">
          <ConfigPanel inputs={inputs} onChange={handleChange} />
          <ResultsPanel results={results} inputs={inputs} />
        </div>
      </section>

      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-2xl right-2xl bg-text-strong text-white py-lg px-xl rounded-md shadow-md text-sm"
            role="status"
            aria-live="polite"
          >
            Inputs reset to defaults
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
