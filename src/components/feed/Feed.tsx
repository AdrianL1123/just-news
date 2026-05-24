import type { Article, NavState } from '@/types'
import { ArticleCard } from './ArticleCard'
import { SummaryCard } from './SummaryCard'
import { PageSpinner } from '@/components/ui/page-spinner'
import { useSummary } from '@/hooks/useSummary'

interface Props {
  articles: Article[]
  loading: boolean
  error: string | null
  nav: NavState
}

export function Feed({ articles, loading, error, nav }: Props) {
  const summary = useSummary(nav)

  const handleGenerate = () => {
    const headlines = articles.map((a) => a.title)
    summary.generate(headlines)
  }

  return (
    <main className="flex-1 min-w-0">
      <SummaryCard
        status={summary.status}
        text={summary.text}
        error={summary.error}
        onGenerate={handleGenerate}
        onReset={summary.reset}
      />

      {loading && <PageSpinner />}

      {!loading && error && (
        <div className="px-8 py-12 text-sm text-foreground/50">
          {error}
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="px-8 py-12 text-sm text-foreground/50">
          No articles found.
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-8">
          {articles.map((article) => (
            <ArticleCard key={article.uuid} article={article} />
          ))}
        </div>
      )}
    </main>
  )
}
