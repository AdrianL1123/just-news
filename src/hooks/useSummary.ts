import { useMutation } from '@tanstack/react-query'
import { COUNTRIES, CATEGORIES } from '@/config/nav'

interface GenerateInput {
  headlines: string[]
  country: string
  category: string
}

async function callOllama({
  headlines,
  country,
  category,
}: GenerateInput): Promise<string> {
  const countryLabel =
    COUNTRIES.find((c) => c.code === country)?.label ?? country
  const categoryLabel =
    CATEGORIES.find((c) => c.id === category)?.label ?? category

  const prompt = `You are a concise news analyst. Given these headlines from ${categoryLabel} news in ${countryLabel}, write a 3-sentence daily briefing that captures the key themes. Be direct and factual. No preamble.\n\nHeadlines:\n${headlines
    .map((h, i) => `${i + 1}. ${h}`)
    .join('\n')}`

  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'llama3.2', prompt, stream: false }),
  })
  if (!res.ok) throw new Error(`Ollama error: ${res.status}`)
  const data = (await res.json()) as { response: string }
  return data.response.trim()
}

export function useSummary() {
  return useMutation({
    mutationFn: callOllama,
    retry: 0,
  })
}
