import { useState } from 'react'

import TabGroup from './TabGroup'
import MetricCard from './MetricCard'
import BreakdownCard from './BreakdownCard'
import SummaryFooter from './SummaryFooter'
import AssumptionsDisclosure from './AssumptionsDisclosure'
import { formatCurrency, formatHours } from '@/lib/calculations'

function HeroRow({ children }) {
  return <div className="grid grid-cols-3 gap-lg">{children}</div>
}

function BreakdownGrid({ children }) {
  return <div className="grid grid-cols-2 gap-lg">{children}</div>
}

function HighlightPanel({ label, value }) {
  return (
    <div className="bg-bg-page border border-stroke-weak rounded-2xl p-xl flex flex-col gap-sm">
      <span className="text-xs font-medium text-text-weaker">{label}</span>
      <span className="text-xl font-semibold tracking-[-0.4px] tabular-nums text-text-strong">
        {value}
      </span>
    </div>
  )
}

function OperationsView({ results, inputs }) {
  return (
    <>
      <HeroRow>
        <MetricCard
          label="Monthly processing labor saved"
          value={formatCurrency(results.laborTotal)}
          caption="doc chase + income verification"
        />
        <MetricCard
          label="Monthly suspension rework avoided"
          value={formatCurrency(results.suspensionSaved)}
          caption="UW kickbacks eliminated"
        />
        <MetricCard
          emphasized
          label="Monthly total ROI"
          value={formatCurrency(results.monthlyTotal)}
          caption={`vs. $${inputs.cost.toLocaleString()} subscription`}
        />
      </HeroRow>

      <BreakdownGrid>
        <BreakdownCard
          tag="labor"
          label="Document collection & chase time eliminated"
          value={formatCurrency(results.docChaseSaved)}
        />
        <BreakdownCard
          tag="labor"
          label="Income & employment verification automated"
          value={formatCurrency(results.incVerifySaved)}
        />
        <BreakdownCard
          tag="suspensions"
          label="Underwriting rework avoided (70% reduction)"
          value={formatCurrency(results.suspensionSaved)}
        />
        <BreakdownCard
          tag="compliance"
          label="TRID / RESPA / HMDA review time saved"
          value={formatCurrency(results.complianceSaved)}
        />
      </BreakdownGrid>

      <HighlightPanel
        label="Processor capacity unlocked — hours recovered per month that can be redeployed to new loan volume without adding headcount."
        value={`${formatHours(results.hrsFreed)} / month`}
      />
    </>
  )
}

function CFOView({ results }) {
  const annualLabor = (results.laborTotal + results.suspensionSaved + results.complianceSaved) * 12

  return (
    <>
      <HeroRow>
        <MetricCard
          label="Monthly carry cost reduction"
          value={formatCurrency(results.carryCost)}
          caption={`from ${results.dayssaved} ${results.dayssaved === 1 ? 'day' : 'days'} saved per loan`}
        />
        <MetricCard
          label="Annual processing labor saved"
          value={formatCurrency(annualLabor)}
          caption="processor + UW rework combined"
        />
        <MetricCard
          emphasized
          label="Annual net ROI"
          value={formatCurrency(results.annualNet)}
          caption="after subscription cost"
        />
      </HeroRow>

      <div className="grid grid-cols-3 gap-lg">
        <MetricCard
          label="Current cost per loan (processing)"
          value={formatCurrency(results.currentCPL)}
          caption="before Docxster"
        />
        <MetricCard
          label="Cost per loan with Docxster"
          value={formatCurrency(results.afterCPL)}
          caption="after automation savings"
        />
        <MetricCard
          label="Saving per loan closed"
          value={formatCurrency(results.savingPerLoan)}
          caption="margin recaptured per file"
        />
      </div>

      <HighlightPanel
        label="Annual carry cost reduction — faster file assembly and verification shaves days off time-to-close across the full pipeline."
        value={`${formatCurrency(results.carryAnnual)} / yr`}
      />
    </>
  )
}

export default function ResultsPanel({ results, inputs }) {
  const [view, setView] = useState('operations')

  return (
    <div className="sticky top-20 self-start bg-bg-page rounded-xl p-3">
      <div
        className="bg-bg-primary border border-stroke-weak rounded-lg p-2xl flex flex-col gap-xl"
        style={{
          boxShadow:
            '-49px 60px 22px 0 rgba(0,0,0,0.00), -31px 38px 20px 0 rgba(0,0,0,0.01), -18px 21px 17px 0 rgba(0,0,0,0.03), -8px 10px 12px 0 rgba(0,0,0,0.06), -2px 2px 7px 0 rgba(0,0,0,0.07)',
        }}
      >
        <TabGroup
        value={view}
        onChange={setView}
        options={[
          { value: 'operations', label: 'Operations view' },
          { value: 'cfo', label: 'CFO / COO view' },
        ]}
      />

      {view === 'operations' ? (
        <OperationsView results={results} inputs={inputs} />
      ) : (
        <CFOView results={results} />
      )}

      <SummaryFooter
        paybackWeeks={results.paybackWeeks}
        roiMultiplier={results.roiMultiplier}
      />

        <AssumptionsDisclosure />
      </div>
    </div>
  )
}
