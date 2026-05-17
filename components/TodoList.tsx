'use client'

import type { Todo } from '@/types/database'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string, is_completed: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 py-10">
        할 일이 없습니다. 새 항목을 추가해보세요!
      </p>
    )
  }

  const remaining = todos.filter((t) => !t.is_completed).length

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">
        총 {todos.length}개 · 남은 항목 {remaining}개
      </p>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  )
}
