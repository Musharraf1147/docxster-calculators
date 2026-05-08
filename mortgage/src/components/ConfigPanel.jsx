import Slider from './Slider'
import TabGroup from './TabGroup'
import { formatCurrency } from '@/lib/calculations'

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-2xl py-[40px]">
      <h3 className="font-['Source_Code_Pro'] text-[14px] font-semibold uppercase leading-[150%] tracking-[-0.2px] bg-[linear-gradient(-90deg,#FC9132_0%,#FA0136_49%,#B711C4_100%)] bg-clip-text text-transparent w-fit">
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function ConfigPanel({ inputs, onChange }) {
  const set = (key) => (value) => onChange(key, value)

  return (
    <div className="flex flex-col section-dashed-divider">
      <Section title="Loan volume & pipeline">
        <Slider
          label="Monthly loan applications"
          value={inputs.loans}
          min={0}
          max={1000}
          step={10}
          onChange={set('loans')}
          formatValue={(v) => v.toLocaleString()}
        />
        <Slider
          label="Avg. loan amount"
          helper="Used for carry cost calculation"
          value={inputs.loanamt}
          min={0}
          max={2000000}
          step={25000}
          onChange={set('loanamt')}
          formatValue={formatCurrency}
        />
        <Slider
          label="Avg. days in process — current"
          helper="Industry avg. 40–45 days; well-run shops 28–35"
          value={inputs.dip}
          min={0}
          max={90}
          step={1}
          onChange={set('dip')}
          formatValue={(v) => `${v} ${v === 1 ? 'day' : 'days'}`}
        />
        <Slider
          label="Days saved with Docxster"
          helper="Conservative estimate — faster doc collection & verification"
          value={inputs.dayssaved}
          min={0}
          max={10}
          step={1}
          onChange={set('dayssaved')}
          formatValue={(v) => `${v} ${v === 1 ? 'day' : 'days'}`}
        />
        <Slider
          label="Note rate for carry cost"
          value={inputs.noterate}
          min={0}
          max={0.15}
          step={0.0025}
          onChange={set('noterate')}
          formatValue={(v) => `${(v * 100).toFixed(2)}%`}
        />
      </Section>

      <Section title="Processing team">
        <Slider
          label="Processor FTEs"
          value={inputs.ftes}
          min={0}
          max={50}
          step={1}
          onChange={set('ftes')}
        />
        <Slider
          label="Fully-loaded hourly rate"
          helper="Processor range: $22–$35/hr fully loaded"
          value={inputs.rate}
          min={0}
          max={65}
          step={1}
          onChange={set('rate')}
          formatValue={(v) => `$${v}`}
        />
        <Slider
          label="Avg. processor hours per loan"
          helper="Industry estimate: 12–20 hrs for complex files"
          value={inputs.hrsperloan}
          min={0}
          max={40}
          step={1}
          onChange={set('hrsperloan')}
          formatValue={(v) => `${v} hrs`}
        />
      </Section>

      <Section title="Document collection & chase">
        <TabGroup
          label="% of processor time on doc collection"
          helper="Chasing borrowers, employers, title companies"
          value={inputs.docchase}
          onChange={set('docchase')}
          options={[
            { value: 0.20, label: '20%' },
            { value: 0.30, label: '30%' },
            { value: 0.40, label: '40%' },
            { value: 0.50, label: '50%' },
            { value: 0.60, label: '60%' },
          ]}
        />
        <Slider
          label="Avg. borrower follow-ups per loan"
          helper="Pay stubs, bank statements, letters of explanation"
          value={inputs.followups}
          min={0}
          max={20}
          step={1}
          onChange={set('followups')}
        />
      </Section>

      <Section title="Income & employment verification">
        <TabGroup
          label="% of processor time on income verification"
          helper="Manual cross-check: pay stubs, W-2s, 1099s, bank statements"
          value={inputs.incverify}
          onChange={set('incverify')}
          options={[
            { value: 0.20, label: '20%' },
            { value: 0.30, label: '30%' },
            { value: 0.40, label: '40%' },
            { value: 0.50, label: '50%' },
          ]}
        />
        <TabGroup
          label="Underwriting suspension rate"
          helper="Loans kicked back for doc issues or calc errors"
          value={inputs.susprate}
          onChange={set('susprate')}
          options={[
            { value: 0.05, label: '5%' },
            { value: 0.10, label: '10%' },
            { value: 0.15, label: '15%' },
            { value: 0.20, label: '20%' },
          ]}
        />
        <Slider
          label="Avg. rework hours per suspension"
          helper="Processor + underwriter time to clear the condition"
          value={inputs.reworkhrs}
          min={0}
          max={12}
          step={0.5}
          onChange={set('reworkhrs')}
          formatValue={(v) => `${v} hrs`}
        />
      </Section>

      <Section title="Compliance review">
        <Slider
          label="Compliance review time per loan"
          helper="TRID tolerance checks, RESPA, HMDA tagging"
          value={inputs.complhrs}
          min={0}
          max={6}
          step={0.25}
          onChange={set('complhrs')}
          formatValue={(v) => `${v} hrs`}
        />
      </Section>

      <Section title="Docxster cost">
        <Slider
          label="Monthly subscription"
          value={inputs.cost}
          min={0}
          max={10000}
          step={250}
          onChange={set('cost')}
          formatValue={(v) => `$${v.toLocaleString()}`}
        />
      </Section>
    </div>
  )
}
