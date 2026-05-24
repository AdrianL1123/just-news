import { useState } from 'react'
import { Topbar } from './Topbar'
import { Sidebar } from './Sidebar'
import { Feed } from '@/components/feed/Feed'
import { useNews } from '@/hooks/useNews'
import { COUNTRIES, CATEGORIES } from '@/config/nav'
import type { NavState } from '@/types'

const DEFAULT_NAV: NavState = {
  country: COUNTRIES[0],
  category: CATEGORIES[0],
}

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [nav, setNav] = useState<NavState>(DEFAULT_NAV)

  const { articles, loading, refreshing, error, updatedAt, refresh } = useNews(
    nav.country.locale,
    nav.category.id
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar
        nav={nav}
        updatedAt={updatedAt}
        refreshing={refreshing}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        onRefresh={refresh}
      />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} nav={nav} onNavChange={setNav} />
        <Feed articles={articles} loading={loading} error={error} nav={nav} />
      </div>
    </div>
  )
}
