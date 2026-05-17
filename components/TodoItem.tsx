'use client'

import type { Todo } from '@/types/database'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, is_completed: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group">
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={() => onToggle(todo.id, !todo.is_completed)}
        className="w-5 h-5 rounded accent-blue-600 cursor-pointer flex-shrink-0"
      />
      <span
        className={`flex-1 text-gray-800 ${
          todo.is_completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all text-sm px-2 py-1 rounded"
        aria-label="삭제"
      >
        삭제
      </button>
    </li>
  )
}
