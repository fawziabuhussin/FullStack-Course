import React from 'react'
import Post from './Post'

export default function PostList ({
  posts,
  onEdit,
  onDelete
}: {
  posts: {
    id: number
    title: string
    author: { name: string; email: string } | null
    content: string
  }[]
  onEdit: (id: number, content: string) => void
  onDelete: (id: number) => void
}) {
  if (!Array.isArray(posts)) {
    return null // or some fallback UI
  }

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}