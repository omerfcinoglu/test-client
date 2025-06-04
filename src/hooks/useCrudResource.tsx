import { useState, useEffect, useCallback } from 'react'
import api from '@/api'

export default function useCrudResource<T>(resource: string) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get<T[]>(`/${resource}`)
      setItems(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [resource])

  const remove = useCallback(async (id: string) => {
    await api.delete(`/${resource}/${id}`)
    await fetch()
  }, [resource, fetch])

  const create = useCallback(async (payload: Partial<T>) => {
    await api.post(`/${resource}`, payload)
    await fetch()
  }, [resource, fetch])

  const update = useCallback(async (id: string, payload: Partial<T>) => {
    await api.put(`/${resource}/${id}`, payload)
    await fetch()
  }, [resource, fetch])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { items, loading, error, fetch, remove, create, update }
}
