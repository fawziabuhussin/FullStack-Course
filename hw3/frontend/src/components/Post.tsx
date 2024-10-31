import React, { useState } from 'react';

export default function Post({
  post,
  onEdit,
  onDelete,
  user
}: {
  post: {
    id: number;
    title: string;
    author: { name: string; email: string } | null;
    content: string;
  };
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  user: { name: string; email: string; username: string; token: string } | null;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  if (!post || !post.id) {
    console.log(post && post.id);
    return <div>Error: Post data is invalid.</div>; // or handle differently based on your requirements
  }

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);
  const handleSaveClick = () => {
    onEdit(post.id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="note" id={post.id.toString()}>
      <h2>{post.title}</h2>
      {post.author && (
        <small>By {post.author.name} ({post.author.email})</small>
      )}
      <br />
      {isEditing ? (
        <>
          <textarea
            name={`text_input-${post.id}`}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button name={`text_input_save-${post.id}`} onClick={handleSaveClick}>Save</button>
          <button name={`text_input_cancel-${post.id}`} onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <p>{post.content}</p>
      )}
      {user && user.username === post.author?.name && (
        <>
          <button name={`edit-${post.id}`} onClick={handleEditClick}>Edit</button>
          <button name={`delete-${post.id}`} onClick={() => onDelete(post.id)}>Delete</button>
        </>
      )}
    </div>
  );
}
