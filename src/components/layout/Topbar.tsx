import { PanelLeft, RefreshCw } from 'lucide-react'
import type { NavState } from '@/types'
import { formatUpdatedAt } from '@/lib/time'

interface Props {
  nav: NavState
  updatedAt: Date | null
  refreshing: boolean
  sidebarOpen: boolean
  onToggleSidebar: () => void
  onRefresh: () => void
}

export function Topbar({
  nav,
  updatedAt,
  refreshing,
  sidebarOpen,
  onToggleSidebar,
  onRefresh,
}: Props) {
  return (
    <header className="h-12 px-5 border-b border-border flex items-center sticky top-0 bg-background/90 backdrop-blur-md z-50 flex-shrink-0">
      <button
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        className="p-1.5 text-foreground hover:text-foreground transition-colors mr-2.5"
      >
        <PanelLeft className="w-4 h-4" />
      </button>

      <span className="font-serif text-[18px] tracking-[-0.2px] mr-auto select-none">
        Just<span className="text-primary">.</span>News
      </span>

      <div className="flex items-center gap-3.5">
        <span className="text-sm text-foreground hidden sm:block">
          <span className="text-foreground font-medium">{nav.category.label}</span>
          {' · '}
          {nav.country.label}
        </span>

        {updatedAt && (
          <span className="text-xs text-foreground/50 hidden sm:block">
            Updated {formatUpdatedAt(updatedAt)}
          </span>
        )}

        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-2.5 py-1 border border-border text-foreground text-xs hover:border-primary hover:text-primary hover:bg-primary/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
    </header>
  )
}
