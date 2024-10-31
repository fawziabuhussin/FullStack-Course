// src/app/components/types.ts
export interface User {
    name: string;
    email: string;
    username: string;
    token: string;
  }
  
  export interface Note {
    id: number;
    title: string;
    author: { name: string; email: string } | null;
    content: string;
  }
  