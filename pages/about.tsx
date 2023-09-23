import Head from 'next/head'

const about = () => {
  return (
    <div>
      <Head>
        <title>Blogify</title>
      </Head>
      <h1>About</h1>
      <p>This is a simple blogging application using jsonplaceholder as api to demonstrate CRUD operations on the blogs.
        NB: jsonplaceholder doesn't allow to add and remove posts as wanted so I used a local data to test the CRUD operations first then connected it with the jsonplaceholder api.
      </p>
    </div>
  )
}

export default about