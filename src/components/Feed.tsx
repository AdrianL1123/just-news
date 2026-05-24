import { useEffect } from 'react'
import { ArticleCard } from './ArticleCard'
import { SummaryCard } from './SummaryCard'
import { PageSpinner } from '@/components/ui/page-spinner'
import { useNews } from '@/hooks/useNews'
import { useSummary } from '@/hooks/useSummary'

interface Props {
  country: string
  category: string
}

export function Feed({ country, category }: Props) {
  const { data: articles = [], isPending, isError } = useNews(country, category)
  const summary = useSummary()

  useEffect(() => {
    summary.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, category])

  const handleGenerate = () => {
    summary.mutate({
      headlines: articles.map((a) => a.title),
      country,
      category,
    })
  }

  const summaryStatus =
    summary.status === 'pending'
      ? 'loading'
      : summary.status === 'success'
        ? 'done'
        : summary.status === 'error'
          ? 'error'
          : 'idle'

  return (
    <>
      <SummaryCard
        status={summaryStatus}
        text={summary.data ?? null}
        error={summary.error?.message ?? null}
        onGenerate={handleGenerate}
        onReset={summary.reset}
      />

      {isPending && <PageSpinner />}

      {!isPending && isError && (
        <div className="px-8 py-12 text-sm text-foreground/50">
          Could not load news. Try refreshing.
        </div>
      )}

      {!isPending && !isError && articles.length === 0 && (
        <div className="px-8 py-12 text-sm text-foreground/50">
          No articles found.
        </div>
      )}

      {!isPending && !isError && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-8">
          {articles.map((article) => (
            <ArticleCard key={article.uuid} article={article} />
          ))}
        </div>
      )}
    </>
  )
}
