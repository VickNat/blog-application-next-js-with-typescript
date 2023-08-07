import { Blog } from '@/types'
import React, { useState } from 'react'
import updatePosts from '../../../styles/CreatePost.module.css'

interface Props {
  blog: Blog
}

const edit: React.FC<Props>  = ({blog}) => {

  const [title, setTitle] = useState(blog.title)
  const [body, setBody] = useState(blog.body)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const id = blog.id

    const updatedBlog: Blog = {
      id: id,
      createdAt: new Date().toISOString(),
      body: body,
      title: title
    }

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PATCH",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          updatedBlog
        })
      })

      const blogCreated = await res.json()
      console.log('Blog updated:', blogCreated);
      console.log(updatedBlog);
      
    } catch (error) {
      console.error('Error updating blog:', error);
    }

    setIsSubmitting(false);
  }

  return (
    <div className={updatePosts.container}>
      <h1 className={updatePosts.title}>Edit your blog</h1>

      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={updatePosts.input}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={updatePosts.textarea}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  )
}

export const getStaticProps = async (context: { params: { id: any } }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)

  const blog = await res.json()

  return {
    props: {
      blog
    }
  }
}

export const getStaticPaths =async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

  const blogs = await res.json()

  const ids = blogs.map((blog: any) => blog.id)
  const paths = ids.map((id: any) => ({params: {id: id.toString()}}))

  return {
    paths,
    fallback: false
  }
}

export default edit