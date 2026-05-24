import { Sparkles, RotateCcw, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

interface Props {
  status: 'idle' | 'loading' | 'done' | 'error'
  text: string | null
  error: string | null
  onGenerate: () => void
  onReset: () => void
}

export function SummaryCard({
  status,
  text,
  error,
  onGenerate,
  onReset,
}: Props) {
  if (status === 'idle') {
    return (
      <div className="px-8 py-4 border-b border-border flex items-center">
        <Button
          onClick={onGenerate}
          variant="ghost"
          size="sm"
          className="text-foreground/60 hover:text-primary gap-2 px-0"
        >
          <Sparkles className="size-4" />
          Summarize today with AI
        </Button>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="px-8 py-4 border-b border-border flex items-center gap-2 text-sm text-foreground/60">
        <Spinner className="size-4" />
        Generating summary…
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="px-8 py-4 border-b border-border flex items-center justify-between gap-3">
        <span className="text-sm text-foreground/60">{error}</span>
        <Button
          onClick={onReset}
          variant="ghost"
          size="sm"
          className="text-foreground/50 hover:text-foreground/80 gap-1"
        >
          <X className="size-3.5" />
          Dismiss
        </Button>
      </div>
    )
  }

  return (
    <Card className="mx-8 my-5 border-l-2 border-l-primary">
      <div className="px-5 py-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-primary">
            <Sparkles className="size-4" />
            AI Briefing
          </span>
          <Button
            onClick={onReset}
            variant="ghost"
            size="icon"
            className="size-7 text-foreground/30 hover:text-foreground/60"
            aria-label="Close summary"
          >
            <RotateCcw className="size-3.5" />
          </Button>
        </div>
        <p className="text-base text-foreground leading-relaxed">{text}</p>
      </div>
    </Card>
  )
}
