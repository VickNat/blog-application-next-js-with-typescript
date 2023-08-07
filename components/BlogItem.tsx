import Link from 'next/link'
import blogStyles from '../styles/Blog.module.css'
import { Blog } from '@/types/index'

interface Props {
  blog: Blog
}

const BlogItem: React.FC<Props> = ({blog}) => {
  return (
    <Link href='/blog/[id]' as={`/blog/${blog.id}`}>
      <div className={blogStyles.card}>
        <h3>{blog.title}</h3>
        <p>{blog.body}</p>
      </div>
    </Link>
  )
}

export default BlogItem