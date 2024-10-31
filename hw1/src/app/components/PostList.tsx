import React from 'react';
import Post from './Post';

export default function PostList({ posts }: { posts: { id: number; title: string; author: { name: string; email: string }; content: string }[] }) {
  if (!Array.isArray(posts)) {
    return null; // or some fallback UI
  }
  
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
