// src/app/styles/styles.ts

export const styles: { [key: string]: React.CSSProperties } = {
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
      color: '#333',
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
  