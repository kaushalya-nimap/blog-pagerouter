import Link from "next/link";
import styles from "./index.module.css";
// export default function Blog({data}){
//     console.log(data)
//     return(
//         <div className={styles.mainDiv}>
//             {data.map(post=>(
//                 <div className={styles.blogDiv} key={post._id}>
//                     <Link href={`/blog/${post._id}`}>
//                     <h2>{post.title}</h2>
//                     <p>{post.content}</p>
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     )
// }
export default function Blog({ data }) {
  console.log(data);
  return (
    <div className={styles.mainDiv}>
      {data.todos.map((post) => (
        <div className={styles.blogDiv} key={post.id}>
          <Link href={`/blog/${post.id}`}>
            <h1>Todo id:{post.id}</h1>
            <p>{post.todo}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch("https://dummyjson.com/todos");
  const data = await res.json();
  //const data=posts.blogs
  console.log(data);
  return {
    props: { data },
  };
}
