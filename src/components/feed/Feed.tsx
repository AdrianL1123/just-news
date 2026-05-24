import type { Article, NavState } from '@/types'
import { ArticleRow } from './ArticleRow'
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

      {!loading &&
        !error &&
        articles.map((article) => (
          <ArticleRow key={article.uuid} article={article} />
        ))}
    </main>
  )
}
