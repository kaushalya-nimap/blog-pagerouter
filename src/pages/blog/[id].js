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


// export async function getServerSideProps(context) {
//   const { params } = context; 
//   console.log(context)
//   const res = await fetch(`https://dummyjson.com/todos/${params.id}`);
//   const data = await res.json();

//   if (!data || !data.id) { 
//     return { notFound: true };
//   }

//   return {
//     props: { post: data }, 
//   };
// }
export async function getStaticPaths(){
    const res = await fetch("http://localhost:3000/api/todo");
    const data = await res.json();
    
    const paths=data.todos.map((todo)=>({
        params:{id:todo.id.toString()}
    }))
   // console.log(paths)

    return{
        paths,
        fallback:"blocking"
    }
}

export async function getStaticProps(context) {
    const { params } = context; 
   // console.log(context)
    const res = await fetch(`http://localhost:3000/api/todo?id=${params.id}`);
    const data = await res.json();
  
    if (!data || !data.id) { 
      return { notFound: true };
    }
  
    return {
      props: { post: data }, 
    };
  }
  
