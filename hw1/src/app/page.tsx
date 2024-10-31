"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './components/PostList';
import Pagination from './components/Pagination';

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 10;

  useEffect(() => {
        const promise = axios.get(`http://localhost:3001/notes`, {
          params: {
            _page: currentPage,
            _per_page: postsPerPage
          }});
        // const response = await axios.get(`http://localhost:3001/notes?_page=${currentPage}&limit=${postsPerPage}`);
        promise.then(response => {
          setTotalPosts(response.data.items);
          setPosts(response.data.data);
      }).catch(error => { console.log("Encountered an error:" + error)});

    } , [currentPage]);

    
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>It is always cool to get the highest grade!</h1>
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        onPageChange={onPageChange}
      />
      <PostList posts={posts} />
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        onPageChange={onPageChange}
      />
    </div>
  );
}

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
    color: '#333',  // Ensure the text color is dark
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
};