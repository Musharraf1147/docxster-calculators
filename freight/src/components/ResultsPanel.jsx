import { useState } from 'react'

import TabGroup from './TabGroup'
import MetricCard from './MetricCard'
import BreakdownCard from './BreakdownCard'
import SummaryFooter from './SummaryFooter'
import AssumptionsDisclosure from './AssumptionsDisclosure'
import { formatCurrency } from '@/lib/calculations'

function HeroRow({ children }) {
  return <div className="grid grid-cols-3 gap-lg">{children}</div>
}

function BreakdownGrid({ children }) {
  return <div className="grid grid-cols-2 gap-lg">{children}</div>
}

function OperationsView({ results, inputs }) {
  return (
    <>
      <HeroRow>
        <MetricCard
          label="Monthly margin recovered"
          value={formatCurrency(results.overbillRecovered)}
          caption="Overbilling caught by Docxster"
        />
        <MetricCard
          label="Monthly labor savings"
          value={formatCurrency(results.totalLaborSaved)}
          caption="Document handling + dispute labor saved"
        />
        <MetricCard
          emphasized
          label="Monthly total ROI"
          value={formatCurrency(results.monthlyROI)}
          caption={`vs. ${formatCurrency(inputs.subscriptionCost)} subscription`}
        />
      </HeroRow>

      <BreakdownGrid>
        <BreakdownCard
          tag="margin"
          label="Overbilling Docxster catches that you currently miss"
          value={formatCurrency(results.overbillRecovered)}
        />
        <BreakdownCard
          tag="labor"
          label="Time saved on doc matching"
          value={formatCurrency(results.docLaborSaved)}
        />
        <BreakdownCard
          tag="disputes"
          label="Time saved on dispute resolution"
          value={formatCurrency(results.disputeTimeSaved)}
        />
        <BreakdownCard
          tag="cashflow"
          label="Cash freed up by faster POD collection"
          value={formatCurrency(results.cashFlowFreed)}
        />
      </BreakdownGrid>
    </>
  )
}

function FinanceView({ results }) {
  return (
    <>
      <HeroRow>
        <MetricCard
          label="Annual overbilling leakage (current)"
          value={formatCurrency(results.totalOverbilling * 12)}
          caption="Paid to carriers above contracted rate"
        />
        <MetricCard
          label="Working capital tied up in POD"
          value={formatCurrency(results.cashFlowFreed)}
        />
        <MetricCard
          emphasized
          label="Net annual ROI"
          value={formatCurrency(results.annualNet)}
          caption="After Docxster subscription"
        />
      </HeroRow>

      <BreakdownGrid>
        <BreakdownCard
          tag="margin"
          label="Overbilling recovered per year"
          value={formatCurrency(results.overbillRecovered * 12)}
        />
        <BreakdownCard
          tag="cashflow"
          label="Annual opportunity cost of POD lag"
          value={formatCurrency(results.podOpportunityCost * 12)}
        />
        <BreakdownCard
          tag="disputes"
          label="Annual dispute overhead eliminated"
          value={formatCurrency(results.disputeTimeSaved * 12)}
        />
        <BreakdownCard
          tag="labor"
          label="Annual document labor recovered"
          value={formatCurrency(results.docLaborSaved * 12)}
        />
      </BreakdownGrid>
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
          { value: 'operations', label: 'Operational view' },
          { value: 'finance', label: 'CFO / owner view' },
        ]}
      />

      {view === 'operations' ? (
        <OperationsView results={results} inputs={inputs} />
      ) : (
        <FinanceView results={results} />
      )}

      <CashFlowPanel value={results.cashFlowFreed} />

      <SummaryFooter
        paybackWeeks={results.paybackWeeks}
        roiMultiplier={results.roiMultiplier}
        annualNet={results.annualNet}
      />

        <AssumptionsDisclosure />
      </div>
    </div>
  )
}

function CashFlowPanel({ value }) {
  return (
    <div className="bg-bg-primary border border-stroke-weak rounded-2xl p-xl shadow-xs flex items-center justify-between gap-lg flex-wrap">
      <span className="text-sm font-medium text-text-weak max-w-[360px] leading-snug">
        Working capital freed from POD lag reduction — billings that can go out faster when POD collection is automated.
      </span>
      <span className="text-xl tracking-[-0.4px] font-semibold tabular-nums text-text-strong whitespace-nowrap">
        {formatCurrency(value)} / month
      </span>
    </div>
  )
}
