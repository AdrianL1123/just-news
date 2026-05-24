import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

export function PageSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex min-h-[50vh] items-center justify-center',
        'animate-in fade-in zoom-in',
        className,
      )}
    >
      <Spinner className="size-8" />
    </div>
  )
}
