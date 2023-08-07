import React, { useState } from 'react'
import axios from 'axios'
import { Blog } from '@/types'
import createPostStyles from '../styles/CreatePost.module.css'

const createPost: React.FC = () => {

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const createdAt = Date.now()
    const id = Math.random().toString(36).substring(2, 9)

    const blog: Blog = {
      id: id,
      createdAt: new Date().toISOString(),
      body: body,
      title: title
    }

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          blog
        })
      })

      const blogCreated = await res.json()
      console.log('Blog created:', blogCreated);
      console.log(blog);
      
    } catch (error) {
      console.error('Error creating blog:', error);
    }

    setIsSubmitting(false);
  }

  return (
    <div className={createPostStyles.container}>
      <h1 className={createPostStyles.title}>Create a blog</h1>

      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={createPostStyles.input}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={createPostStyles.textarea}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  )
}

export default createPost