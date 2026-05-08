import { docxsterLogoDataUrl } from '../assets/docxsterLogoDataUrl'

export default function Header({ onReset }) {
  return (
    <header className="sticky top-0 z-50 bg-bg-page border-b border-stroke-weak">
      <div className="max-w-[1320px] mx-auto py-lg px-2xl flex items-center justify-between gap-xl">
        <img
          src={docxsterLogoDataUrl}
          alt="Docxster"
          className="h-8 w-auto"
        />
        <span className="text-sm text-text-weak">
          ROI Calculator — Mortgage Lenders & Originators
        </span>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-text-weak px-lg py-sm rounded-md border border-stroke-weak bg-transparent transition-colors hover:bg-bg-subtle hover:text-text-strong focus-visible:outline-2 focus-visible:outline-stroke-strong focus-visible:outline-offset-2"
        >
          Reset to defaults
        </button>
      </div>
    </header>
  )
}
