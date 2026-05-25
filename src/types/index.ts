export interface Article {
  uuid: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  categories: string[];
  image_url?: string;
}
