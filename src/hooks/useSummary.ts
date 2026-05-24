import { useState } from 'react'
import type { NavState } from '@/types'

type Status = 'idle' | 'loading' | 'done' | 'error'

interface SummaryState {
  text: string | null
  status: Status
  error: string | null
}

export function useSummary(nav: NavState) {
  const [state, setState] = useState<SummaryState>({
    text: null,
    status: 'idle',
    error: null,
  })

  const generate = async (headlines: string[]) => {
    setState({ text: null, status: 'loading', error: null })

    const prompt = `You are a concise news analyst. Given these headlines from ${nav.category.label} news in ${nav.country.label}, write a 3-sentence daily briefing that captures the key themes. Be direct and factual. No preamble.\n\nHeadlines:\n${headlines.map((h, i) => `${i + 1}. ${h}`).join('\n')}`

    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt,
          stream: false,
        }),
      })

      if (!res.ok) throw new Error(`Ollama error: ${res.status}`)

      const data = await res.json()
      setState({ text: data.response, status: 'done', error: null })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to generate summary'
      setState({ text: null, status: 'error', error: msg })
    }
  }

  const reset = () => setState({ text: null, status: 'idle', error: null })

  return { ...state, generate, reset }
}
