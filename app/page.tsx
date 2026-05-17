'use client'

import { useEffect, useState } from 'react'
import type { Todo } from '@/types/database'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      const res = await fetch('/api/todos')
      if (!res.ok) throw new Error('불러오기 실패')
      setTodos(await res.json())
    } catch {
      setError('할 일 목록을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd(title: string) {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    if (!res.ok) return
    const newTodo: Todo = await res.json()
    setTodos((prev) => [newTodo, ...prev])
  }

  async function handleToggle(id: string, is_completed: boolean) {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_completed }),
    })
    if (!res.ok) return
    const updated: Todo = await res.json()
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    if (!res.ok) return
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">할 일 목록</h1>
        <p className="text-gray-500 mb-8">오늘 해야 할 일을 관리하세요.</p>

        <TodoForm onAdd={handleAdd} />

        {loading && (
          <p className="text-center text-gray-400 py-10">불러오는 중...</p>
        )}
        {error && (
          <p className="text-center text-red-500 py-10">{error}</p>
        )}
        {!loading && !error && (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}
