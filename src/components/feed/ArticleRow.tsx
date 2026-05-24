import { ArrowUpRight } from 'lucide-react'
import type { Article } from '@/types'
import { relativeTime } from '@/lib/time'

interface Props {
  article: Article
}

function formatSource(source: string): string {
  return source
    .replace(/^www\./i, '')
    .replace(/\.(com|net|org|io|co\.uk|co|news|tv)$/i, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function ArticleRow({ article }: Props) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-baseline justify-between gap-6 px-8 py-[18px] border-b border-border transition-colors hover:bg-card"
    >
      <div className="flex-1 min-w-0">
        <p className="font-serif text-[17px] leading-[1.35] tracking-[-0.1px] mb-1.5 transition-colors group-hover:text-primary">
          {article.title}
        </p>
        <div className="flex items-center gap-2 text-[11.5px]">
          <span className="font-medium text-foreground">
            {formatSource(article.source)}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground/30 flex-shrink-0" />
          <span className="text-foreground/50">
            {relativeTime(article.published_at)}
          </span>
        </div>
      </div>
      <ArrowUpRight className="w-3.5 h-3.5 text-foreground/20 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all flex-shrink-0" />
    </a>
  )
}
