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
        <li>Entry error rate default 10% (CBP audit data)</li>
        <li>CF-28 response cost = 3 hrs × hourly rate</li>
        <li>ISF penalty rate $5,000/violation (19 CFR § 113.63)</li>
        <li>Processing time 50 min/entry (GSA benchmark)</li>
        <li>65% of manual extraction time eliminated through automation</li>
        <li>85% of total annual risk exposure reduced with Docxster</li>
        <li>All sliders go to zero to model any scenario</li>
      </ul>
    </details>
  )
}
