export interface Article {
  uuid: string
  title: string
  url: string
  source: string
  published_at: string
  categories: string[]
  image_url?: string
}

export interface NewsResponse {
  data: Article[]
  meta: {
    found: number
    returned: number
    limit: number
    page: number
  }
}
