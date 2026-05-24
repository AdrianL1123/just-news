import { createFileRoute, redirect } from '@tanstack/react-router'
import { readLastVisited } from '@/lib/lastVisited'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { country, category } = readLastVisited()
    throw redirect({
      to: '/$country/$category',
      params: { country, category },
      replace: true,
    })
  },
})
