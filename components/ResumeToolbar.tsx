'use client'

interface Props {
  toolbarLabel?: string
  printButtonLabel?: string
  downloadButtonLabel?: string
  homeButtonLabel?: string
}

export function ResumeToolbar({ toolbarLabel, printButtonLabel, downloadButtonLabel = 'Download PDF', homeButtonLabel }: Props) {
  return (
    <div className="toolbar">
      <span>{toolbarLabel}</span>
      <a href="/resume.pdf" download="elon-berisha-resume.pdf">{downloadButtonLabel}</a>
      <button type="button" onClick={() => window.print()}>{printButtonLabel}</button>
      <a href="/">{homeButtonLabel}</a>
    </div>
  )
}
