import { Blog } from '@/types'
import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import {useRouter} from 'next/router'
import blogStyles from '../../../styles/Blog.module.css'

interface Props {
  blog: Blog
}

const blog: React.FC<Props> = ({blog}) => {

  const router = useRouter();

  const handleDelete = async (e: React.FormEvent) => {
    const id = blog.id
    if (
      window.confirm(
        "Please confirm you want to delete this record."
      )
    ) {
      e.preventDefault();

      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            'content-type': 'application/json'
          }
        })
  
        const blogDeleted = await res.json()
        console.log('Blog deleted:', blogDeleted);
        // console.log(blog);

        router.push('/');
        
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
        
    }
  }

  return (
    <>
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
      <br />
      <Link className='link' href={`/`}>
        <p>Go back</p>
      </Link>
      <Link href={`/edit/[id]`} as={`/edit/${blog.id}`} >
        <p className='link'>Edit</p>
      </Link>
      <button onClick={handleDelete}>Delete blog</button>
    </>
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

export default blog