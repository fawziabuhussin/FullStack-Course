import React from 'react';

export default function Post({ post }: { post: { id: number; title: string; author: { name: string; email: string }; content: string } }) {
  return (
    <div className="post" id={post.id.toString()}>
      <h2>{post.title}</h2>
      <small>By {post.author.name} ({post.author.email})</small>
      <br />
      <p>{post.content}</p>
    </div>
  );
}
