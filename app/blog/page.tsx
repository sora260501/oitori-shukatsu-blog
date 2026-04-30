import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "おひとり様の終活に関する記事一覧。遺言書・エンディングノート・死後事務委任・老人ホームの選び方など。",
};

const categoryLabels: Record<string, string> = {
  will: "遺言書・エンディングノート",
  "post-death": "死後事務委任",
  "nursing-home": "老人ホーム・施設",
  digital: "デジタル遺産",
  medical: "医療・介護の備え",
  basics: "終活の基本",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: selectedCategory } = await searchParams;
  const allPosts = getAllPosts();
  const posts = selectedCategory
    ? allPosts.filter((p) => p.category === selectedCategory)
    : allPosts;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--primary)" }}>
        記事一覧
      </h1>
      <p className="text-sm text-gray-500 mb-6">全{allPosts.length}記事</p>

      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/blog"
          className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
            !selectedCategory
              ? "text-white border-transparent"
              : "text-gray-600 border-gray-300 hover:border-gray-400"
          }`}
          style={!selectedCategory ? { background: "var(--primary)" } : {}}
        >
          すべて
        </Link>
        {Object.entries(categoryLabels).map(([id, label]) => (
          <Link
            key={id}
            href={`/blog?category=${id}`}
            className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
              selectedCategory === id
                ? "text-white border-transparent"
                : "text-gray-600 border-gray-300 hover:border-gray-400"
            }`}
            style={selectedCategory === id ? { background: "var(--primary)" } : {}}
          >
            {label}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-4">📭</p>
          <p>このカテゴリの記事はまだありません</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl p-5 hover:shadow-md transition-shadow no-underline"
              style={{ background: "white", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs px-2 py-0.5 rounded-full text-white"
                  style={{ background: "var(--primary)" }}
                >
                  {post.categoryLabel}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
              <h2 className="font-bold mb-1 text-base" style={{ color: "var(--foreground)" }}>
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">{post.description}</p>
              {post.tags.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
