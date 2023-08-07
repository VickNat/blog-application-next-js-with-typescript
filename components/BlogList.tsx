import { Blog } from '@/types/index'
import blogStyles from '../styles/Blog.module.css'
import BlogItem from './BlogItem'

interface Props{
  blogs: Blog[]
}

const BlogList: React.FC<Props> = ({ blogs }) => {
  return (
    <div className={blogStyles.grid}>
      {
        blogs.map((blog: Blog) => (
          <BlogItem blog={blog} />
        ))
      }
    </div>
  )
}

export default BlogList