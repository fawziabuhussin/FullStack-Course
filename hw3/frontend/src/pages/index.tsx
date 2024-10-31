import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'
import AddNoteForm from '../components/AddNoteForm'
import UserAuthForm from '../components/UserAuthForm'
import { styles } from '../styles/styles'
import { User, Note } from '../components/types'

interface PageProps {
  initialNotes: Note[];
  totalNotes: number;
  initialCache: { [key: number]: Note[] };
}

const cache: { [key: number]: Note[] } = {}

export default function Page ({ initialNotes, totalNotes: initialTotalNotes, initialCache }: PageProps) {
  const [posts, setPosts] = useState<Note[]>(initialNotes)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState(initialTotalNotes)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [user, setUser] = useState<User | null>(null)

  const postsPerPage = 10
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    } else if (currentPage < 3) {
      return Array.from({ length: 5 }, (_, i) => i + 1)
    } else if (currentPage >= totalPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i)
    } else {
      return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
    }
  }


  useEffect(() => {
    Object.assign(cache, initialCache);
  }, [initialCache]);



  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])


  const fetchNotes = async (page: number) => {
    if (cache[page]) {
      return cache[page];
    } else {
      try {
        const response = await axios.get('http://localhost:3001/notes', {
          params: { page, limit: postsPerPage },
        });
        const fetchedNotes = response.data.notes;
        cache[page] = fetchedNotes; // Update global cache
        return fetchedNotes;
      } catch (error) {
        console.error('Encountered an error:', error);
        return [];
      }
    }
  };

  const manageCache = async () => {
    const pageNumbers = getPageNumbers()

    // Fetch pages if not in cache
    const fetchPromises = pageNumbers.map(page => fetchNotes(page))
    const results = await Promise.all(fetchPromises)

    // Clean up cache: remove pages not in pageNumbers
    Object.keys(cache).forEach(key => {
      const page = Number(key)
      if (!pageNumbers.includes(page)) {
        delete cache[page]
      }
    })
    setPosts(cache[currentPage] || results[pageNumbers.indexOf(currentPage)] || []);
  }

  useEffect(() => {
      manageCache()
  }, [currentPage])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleEdit = async (id: number, content: string) => {
    try {
      await axios.put(
        `http://localhost:3001/notes/${id}`,
        { content },
        {
          headers: { Authorization: `Bearer ${user?.token}` }
        }
      )
      setPosts(prevPosts =>
        prevPosts.map(post => (post.id === id ? { ...post, content } : post))
      )
      cache[currentPage] = posts.map(post =>
        post.id === id ? { ...post, content } : post
      ) // Update global cache
    } catch (error) {
      console.error('Failed to edit note:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
      setTotalPosts(prevTotal => prevTotal - 1)
      const lastPage = Math.ceil(totalPosts / postsPerPage)
      const isLastPage = currentPage === lastPage
      if (!isLastPage) {
        fetchNotes(currentPage)
      } else {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
      }
      cache[currentPage] = posts.filter(post => post.id !== id) // Update global cache
    } catch (error) {
      console.error('Failed to delete note:', error)
    }
  }

  const handleAddNote = async (newNote: Note) => {
    try {
      setPosts(prevPosts => [...prevPosts, newNote])
      setTotalPosts(prevTotal => prevTotal + 1)
      const totalPages = Math.ceil((totalPosts + 1) / postsPerPage)
      setCurrentPage(totalPages)
      fetchNotes(totalPages)
      cache[totalPages] = [...posts, newNote] // Update global cache
    } catch (error) {
      console.error('Failed to add note:', error)
    }
  }

  const handleLogin = (user: User) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
        color: theme === 'dark' ? '#f9f9f9' : '#333'
      }}
    >
      <h1 style={styles.header}>It is always cool to get the highest grade!</h1>
      <button
        name='change_theme'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={styles.themeButton}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>

      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        onPageChange={onPageChange}
      />

      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button name='logout' onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <UserAuthForm onLogin={handleLogin} />
      )}

      {user && <AddNoteForm onAddNote={handleAddNote} user={user} />}

      <PostList
        posts={posts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        user={user}
      />
    </div>
  )
}

export async function getStaticProps() {
  // Fetch the total number of notes to determine the number of pages
  const totalNotesResponse = await axios.get('http://localhost:3001/notes');
  const totalNotes = totalNotesResponse.data.totalNotes;
  const postsPerPage = 10;
  const totalPages = Math.ceil(totalNotes / postsPerPage);

  // Fetch up to 5 pages based on the total number of pages
  const fetchPages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1);
  const cache: { [key: number]: Note[] } = {};
  const fetchPromises = fetchPages.map(async (page) => {
    const response = await axios.get('http://localhost:3001/notes', {
      params: { page, limit: postsPerPage },
    });
    cache[page] = response.data.notes;
    return response.data.notes;
  });

  const results = await Promise.all(fetchPromises);

  return {
    props: {
      initialNotes: cache[1] || [],
      totalNotes,
      initialCache: cache,
    },
  };
}

