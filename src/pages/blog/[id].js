import Link from "next/link";

export default function BlogPost({ post }) {
  if (!post) {
    return <h1>Post not found</h1>;
  }
  return (
    <div>
      <h1>{post.todo}</h1> 
      <p>Task ID: {post.id}</p> 
      <Link href="/blog">
        <button>Back to Blog</button>
      </Link>
    </div>
  );
}


export async function getServerSideProps(context) {
  const { params } = context; 
  const res = await fetch(`https://dummyjson.com/todos/${params.id}`);
  const data = await res.json();

  if (!data || !data.id) { 
    return { notFound: true };
  }

  return {
    props: { post: data }, 
  };
}
