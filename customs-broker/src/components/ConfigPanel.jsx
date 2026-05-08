import Slider from './Slider'
import TabGroup from './TabGroup'

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
      <Section title="Volume & team">
        <Slider
          label="Monthly entry volume"
          value={inputs.entries}
          min={0}
          max={5000}
          step={50}
          onChange={set('entries')}
          formatValue={(v) => v.toLocaleString()}
        />
        <Slider
          label="Avg. docs per entry"
          helper="CI, packing list, ISF, arrival notice, 3461/7501"
          value={inputs.docs}
          min={0}
          max={9}
          step={1}
          onChange={set('docs')}
        />
        <Slider
          label="Entry staff FTEs"
          value={inputs.ftes}
          min={0}
          max={50}
          step={1}
          onChange={set('ftes')}
        />
        <Slider
          label="Fully-loaded hourly rate"
          value={inputs.rate}
          min={0}
          max={65}
          step={1}
          onChange={set('rate')}
          formatValue={(v) => `$${v}`}
        />
      </Section>

      <Section title="Time benchmarks">
        <Slider
          label="Time per entry — manual"
          helper="Source: GSA — avg. 50 min (range 45–60)"
          value={inputs.timeMin}
          min={0}
          max={90}
          step={5}
          onChange={set('timeMin')}
          formatValue={(v) => `${v} min`}
        />
        <TabGroup
          label="% time chasing missing data"
          helper="Broker ops estimate — importer/shipper follow-ups"
          value={inputs.chasePct}
          onChange={set('chasePct')}
          options={[
            { value: 0.10, label: '10%' },
            { value: 0.20, label: '20%' },
            { value: 0.25, label: '25%' },
            { value: 0.30, label: '30%' },
            { value: 0.50, label: '50%' },
          ]}
        />
      </Section>

      <Section title="Error & compliance exposure">
        <Slider
          label="Entry error rate"
          helper="CBP audit data — default 8–12%"
          value={inputs.errRate}
          min={0}
          max={0.25}
          step={0.01}
          onChange={set('errRate')}
          formatValue={(v) => `${Math.round(v * 100)}%`}
        />
        <Slider
          label="Avg. cost to remediate one error"
          helper="3 hrs staff time + broker admin + CF-28 response"
          value={inputs.remediate}
          min={0}
          max={1000}
          step={50}
          onChange={set('remediate')}
          formatValue={(v) => `$${v.toLocaleString()}`}
        />
      </Section>

      <Section title="HS classification exposure">
        <TabGroup
          label="HS classification error rate"
          value={inputs.hsRate}
          onChange={set('hsRate')}
          options={[
            { value: 0.02, label: '2%' },
            { value: 0.04, label: '4%' },
            { value: 0.06, label: '6%' },
            { value: 0.08, label: '8%' },
            { value: 0.10, label: '10%' },
          ]}
        />
        <Slider
          label="Avg. duty delta per HS error"
          value={inputs.hsDelta}
          min={0}
          max={2000}
          step={50}
          onChange={set('hsDelta')}
          formatValue={(v) => `$${v.toLocaleString()}`}
        />
      </Section>

      <Section title="ISF exposure">
        <Slider
          label="Monthly ocean entries — ISF"
          value={inputs.ocean}
          min={0}
          max={2000}
          step={25}
          onChange={set('ocean')}
          formatValue={(v) => v.toLocaleString()}
        />
        <TabGroup
          label="ISF error rate"
          helper="CBP penalty: up to $5,000/violation — 19 CFR § 113.63"
          value={inputs.isfRate}
          onChange={set('isfRate')}
          options={[
            { value: 0.02, label: '2%' },
            { value: 0.04, label: '4%' },
            { value: 0.06, label: '6%' },
            { value: 0.08, label: '8%' },
            { value: 0.10, label: '10%' },
          ]}
        />
      </Section>

      <Section title="Docxster cost">
        <Slider
          label="Monthly Docxster subscription"
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
