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

export function ArticleCard({ article }: Props) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col border border-border bg-card transition-all hover:border-primary/60 hover:bg-card/70 overflow-hidden"
    >
      {article.image_url ? (
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={article.image_url}
            alt=""
            loading="lazy"
            onError={(e) => {
              ;(e.currentTarget.parentElement as HTMLElement).style.display = 'none'
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-muted to-card flex items-center justify-center">
          <span className="font-serif text-3xl text-foreground/15 select-none">
            {formatSource(article.source).charAt(0)}
          </span>
        </div>
      )}
      <div className="flex flex-col justify-between gap-5 p-6 flex-1">
        <p className="font-serif text-[22px] leading-[1.3] tracking-[-0.2px] transition-colors group-hover:text-primary">
          {article.title}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-foreground">
              {formatSource(article.source)}
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground/40 flex-shrink-0" />
            <span className="text-muted-foreground">
              {relativeTime(article.published_at)}
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-foreground/20 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all flex-shrink-0" />
        </div>
      </div>
    </a>
  )
}
