import { cn } from '@/lib/utils'
import { COUNTRIES, CATEGORIES } from '@/config/nav'
import type { NavState } from '@/types'

interface Props {
  open: boolean
  nav: NavState
  onNavChange: (nav: NavState) => void
}

export function Sidebar({ open, nav, onNavChange }: Props) {
  return (
    <aside
      className={cn(
        'bg-card border-r border-border sticky top-12 h-[calc(100vh-3rem)] overflow-y-auto flex-shrink-0 transition-all duration-200',
        open ? 'w-[200px] opacity-100' : 'w-0 opacity-0 overflow-hidden'
      )}
    >
      <div className="py-3 pb-8">
        {COUNTRIES.map((country, i) => (
          <div key={country.code}>
            {i > 0 && <div className="h-px bg-border my-2" />}
            <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-foreground/50">
              {country.label}
            </p>
            {CATEGORIES.map(({ id, label, Icon }) => {
              const isActive =
                nav.country.code === country.code && nav.category.id === id
              return (
                <button
                  key={id}
                  onClick={() => onNavChange({ country, category: { id, label, Icon } })}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-[7px] text-[13px] text-foreground border-l-2 border-transparent transition-all text-left',
                    'hover:text-foreground hover:bg-white/[0.025]',
                    isActive && 'text-primary border-l-primary bg-primary/[0.08] font-medium'
                  )}
                >
                  <Icon className="w-3 h-3 flex-shrink-0" />
                  {label}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </aside>
  )
}
