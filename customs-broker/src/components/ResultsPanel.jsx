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
          label="Monthly labor savings"
          value={formatCurrency(results.laborTotal)}
          caption="recovered staff time"
        />
        <MetricCard
          label="Monthly error cost avoided"
          value={formatCurrency(results.errorTotal)}
          caption="validation + HS classification"
        />
        <MetricCard
          emphasized
          label="Monthly total ROI"
          value={formatCurrency(results.monthlyROI)}
          caption={`vs. $${inputs.cost.toLocaleString()} subscription`}
        />
      </HeroRow>

      <BreakdownGrid>
        <BreakdownCard
          tag="labor"
          label="Extraction + re-keying elimination"
          value={formatCurrency(results.extractSaved)}
        />
        <BreakdownCard
          tag="labor"
          label="Missing data chase time eliminated"
          value={formatCurrency(results.chaseSaved)}
        />
        <BreakdownCard
          tag="disputes"
          label="Cross-doc validation catches"
          value={formatCurrency(results.validateSaved)}
        />
        <BreakdownCard
          tag="disputes"
          label="HS classification correction avoided"
          value={formatCurrency(results.hsSaved)}
        />
      </BreakdownGrid>
    </>
  )
}

function ComplianceView({ results }) {
  return (
    <>
      <HeroRow>
        <MetricCard
          label="Annual ISF penalty exposure"
          value={formatCurrency(results.isfAnnual)}
          caption="at current error rate"
        />
        <MetricCard
          label="Annual duty underpayment risk"
          value={formatCurrency(results.dutyAnnual)}
          caption="HS error × duty delta"
        />
        <MetricCard
          emphasized
          label="Annual total risk exposure"
          value={formatCurrency(results.riskTotal)}
          caption="before Docxster"
        />
      </HeroRow>

      <BreakdownGrid>
        <BreakdownCard
          tag="margin"
          label="ISF violations — CBP penalty exposure"
          value={formatCurrency(results.isfAnnual)}
        />
        <BreakdownCard
          tag="margin"
          label="HS misclassification duty liability"
          value={formatCurrency(results.dutyAnnual)}
        />
        <BreakdownCard
          tag="compliance"
          label="CF-28 response burden (monthly)"
          value={formatCurrency(results.cf28Monthly)}
        />
        <BreakdownCard
          tag="compliance"
          label="Annual risk reduced by Docxster"
          value={formatCurrency(results.riskReduced)}
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
          { value: 'compliance', label: 'Compliance / risk view' },
        ]}
      />

      {view === 'operations' ? (
        <OperationsView results={results} inputs={inputs} />
      ) : (
        <ComplianceView results={results} />
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
