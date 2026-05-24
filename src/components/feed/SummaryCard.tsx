import { Sparkles, RotateCcw, X } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

interface Props {
  status: 'idle' | 'loading' | 'done' | 'error'
  text: string | null
  error: string | null
  onGenerate: () => void
  onReset: () => void
}

export function SummaryCard({ status, text, error, onGenerate, onReset }: Props) {
  if (status === 'idle') {
    return (
      <div className="px-8 py-3 border-b border-border flex items-center gap-3">
        <button
          onClick={onGenerate}
          className={cn(
            'flex items-center gap-2 text-xs text-foreground/50',
            'hover:text-primary transition-colors',
          )}
        >
          <Sparkles className="size-3.5" />
          Summarize today with AI
        </button>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="px-8 py-3 border-b border-border flex items-center gap-2 text-xs text-foreground/50">
        <Spinner className="size-3.5" />
        Generating summary…
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="px-8 py-3 border-b border-border flex items-center justify-between gap-3">
        <span className="text-xs text-foreground/50">{error}</span>
        <button
          onClick={onReset}
          className="text-xs text-foreground/40 hover:text-foreground/70 transition-colors flex items-center gap-1"
        >
          <X className="size-3" />
          Dismiss
        </button>
      </div>
    )
  }

  return (
    <div className="px-8 py-4 border-b border-border space-y-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-primary">
          <Sparkles className="size-3.5" />
          AI Briefing
        </span>
        <button
          onClick={onReset}
          className="text-foreground/30 hover:text-foreground/60 transition-colors"
          aria-label="Close summary"
        >
          <RotateCcw className="size-3" />
        </button>
      </div>
      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </div>
  )
}
