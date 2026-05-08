export default function AssumptionsDisclosure() {
  return (
    <details className="group">
      <summary className="text-xs text-text-weak cursor-pointer flex items-center gap-xs list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-stroke-strong focus-visible:outline-offset-2 rounded-sm">
        <svg
          className="w-3 h-3 transition-transform duration-150 group-open:rotate-90"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4.5 3l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Assumptions used in this calculation</span>
      </summary>
      <ul className="mt-md flex flex-col gap-xs text-xs text-text-weaker list-disc pl-lg">
        <li>Processor time savings modeled at 65% automation of doc chase and income verification tasks</li>
        <li>Underwriting suspension reduction 70% with pre-validated files</li>
        <li>Compliance review automation 60%</li>
        <li>Labor savings capped at total team cost (FTEs × 160 hrs × rate) — you cannot save more than your team costs</li>
        <li>Carry cost = loan amount × note rate / 365 × days saved × loan volume</li>
        <li>All sliders go to zero</li>
      </ul>
    </details>
  )
}
