'use client'

interface Props {
  toolbarLabel?: string
  printButtonLabel?: string
  homeButtonLabel?: string
}

export function ResumeToolbar({ toolbarLabel, printButtonLabel, homeButtonLabel }: Props) {
  return (
    <div className="toolbar">
      <span>{toolbarLabel}</span>
      <button type="button" onClick={() => window.print()}>{printButtonLabel}</button>
      <a href="/">{homeButtonLabel}</a>
    </div>
  )
}
