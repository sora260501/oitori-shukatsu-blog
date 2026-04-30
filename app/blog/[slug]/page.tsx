import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      {/* パンくず */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-gray-600">記事一覧</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{post.title}</span>
      </nav>

      {/* ヘッダー */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs px-3 py-1 rounded-full text-white"
            style={{ background: "var(--primary)" }}
          >
            {post.categoryLabel}
          </span>
          <time className="text-xs text-gray-400">{post.date}</time>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4" style={{ color: "var(--foreground)" }}>
          {post.title}
        </h1>
        <p className="text-gray-500 leading-relaxed">{post.description}</p>
      </header>

      {/* 本文 */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />

      {/* タグ */}
      {post.tags.length > 0 && (
        <div className="flex gap-2 mt-8 flex-wrap">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ナビゲーション */}
      <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
        <Link
          href="/blog"
          className="text-sm font-medium hover:opacity-80 transition-opacity"
          style={{ color: "var(--primary)" }}
        >
          ← 記事一覧に戻る
        </Link>
      </div>
    </article>
  );
}
