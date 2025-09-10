// app/blog/page.js
import styles from "./page.module.css";
import Link from "next/link";
import { getAllPosts } from "../../../lib/posts";

export const metadata = { title: "Blog" };
// Optional: revalidate the list (if you might add files and redeploy later)
// export const revalidate = 60;

export default function BlogIndex() {
  const posts = getAllPosts(); // server-side (Node runtime)

  if (!posts.length) {
    return (
      <section style={{ padding: "2rem 1rem" }}>
        <h1>Blog</h1>
        <p>No posts yet.</p>
      </section>
    );
  }

  return (
    <section className={`${styles.blogPage} section`} id="blog">
      <h1 className="sectionTitle">Blog</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map(({ meta }) => (
          <Link key={meta.slug} href={`/blog/${meta.slug}`}>
            <li key={`${meta.slug}-link`} style={{ margin: "1.5rem 0" }}>
              <h2 style={{ margin: 0 }}>{meta.title}</h2>

              <small>{new Date(meta.date).toLocaleDateString()}</small>
              {meta.excerpt && (
                <p style={{ margin: "0.5rem 0" }}>{meta.excerpt}</p>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
