// Page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './Components/PostList';
import Pagination from './Components/Pagination';
import AddNoteForm from './Components/AddNoteForm';


export default function Page() {
  const [posts, setPosts] = useState<{
    id: number;
    title: string;
    author: { name: string; email: string } | null;
    content: string;
  }[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const postsPerPage = 10;

  const fetchNotes = async (page: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/notes`, {
        params: {
          page: page,
          limit: postsPerPage,
        },
      });

      console.log(response.data.totalNotes)
      console.log(response.data.notes)


      setTotalPosts(response.data.totalNotes); // Update to match the response structure
      setPosts(response.data.notes); // Update to match the response structure
    } catch (error) {
      console.log('Encountered an error:' + error);
    }
  };

  useEffect(() => {
    fetchNotes(currentPage);
  }, [currentPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = async (id: number, content: string) => {
    try {
      await axios.put(`http://localhost:3001/notes/${id}`, { content });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, content } : post
        )
      );
    } catch (error) {
      console.error('Failed to edit note:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      setTotalPosts((prevTotal) => prevTotal - 1); 

      const lastPage = Math.ceil(totalPosts / postsPerPage);
      const isLastPage = currentPage === lastPage;
      if (!isLastPage) {
        fetchNotes(currentPage);
      } else {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleAddNote = async (newNote: {
    id: number;
    title: string;
    author: { name: string; email: string };
    content: string;
  }) => {
    try {
      console.log("reached here before adding!");
      setPosts((prevPosts) => [...prevPosts, newNote]);
      setTotalPosts((prevTotal) => prevTotal + 1);
      const totalPages = Math.ceil((totalPosts + 1) / postsPerPage);
      setCurrentPage(totalPages);
      fetchNotes(totalPages);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  


  return (
    <div style={{ ...styles.container, backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9', color: theme === 'dark' ? '#f9f9f9' : '#333' }}>
      <h1 style={styles.header}>It is always cool to get the highest grade!</h1>
      <button name="change_theme" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={styles.themeButton}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        onPageChange={onPageChange}
      />
      <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
      <AddNoteForm onAddNote={handleAddNote} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '10px auto',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: '#333', // Ensure the text color is dark
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  themeButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
};
