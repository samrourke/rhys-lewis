// app/blog/[slug]/page.js
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../../lib/posts";
import PostBody from "../../../../components/PostBody";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

// IMPORTANT: we read from filesystem, so use Node runtime (not edge)
export const runtime = "nodejs";

// Pre-generate static params for known posts
export function generateStaticParams() {
  return getAllPosts().map(({ meta }) => ({ slug: meta.slug }));
}

// Optional SEO per post
export async function generateMetadata({ params }) {
  try {
    const { meta } = getPostBySlug(params.slug);
    return {
      title: meta.title,
      description: meta.excerpt || undefined,
      openGraph: {
        title: meta.title,
        description: meta.excerpt || undefined,
        images: meta.cover ? [meta.cover] : [],
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

// Optional ISR if you want new files to appear without a full redeploy
// export const revalidate = 60;

export default function PostPage({ params }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    return notFound();
  }

  const { meta, content } = post;

  // Hide drafts in production (optional)
  if (meta.draft && process.env.NODE_ENV === "production") {
    return notFound();
  }

  return (
    <section className={`${styles.blogPage} section`} id="blogPage">
      <article className={styles.prose}>
        <Link href="/blog" className={styles.back}>
          &larr; Back
        </Link>
        <header>
          <h1
            className="section Title grainy-text"
            id={styles.blogTitle}
            style={{ marginBottom: "0.25rem" }}
          >
            {meta.title}
          </h1>
          <time dateTime={meta.date}>
            {new Date(meta.date).toLocaleDateString()}
          </time>
          {meta.cover && (
            <Image
              src={meta.cover}
              alt={meta.title}
              style={{ width: "100%", marginTop: "1rem", borderRadius: 12 }}
            />
          )}
        </header>

        <div style={{ marginTop: "1.5rem" }}>
          <PostBody source={content} />
        </div>
      </article>
    </section>
  );
}
