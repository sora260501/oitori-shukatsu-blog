import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

const categories = [
  { id: "basics", label: "終活の基本", icon: "📋", desc: "何から始めればいい？おひとり様の終活入門" },
  { id: "will", label: "遺言書・エンディングノート", icon: "✍️", desc: "自分の意思を確実に残す方法" },
  { id: "post-death", label: "死後事務委任", icon: "🤝", desc: "家族がいなくても安心の仕組みづくり" },
  { id: "nursing-home", label: "老人ホーム・施設", icon: "🏠", desc: "一人でも入れる施設の選び方" },
  { id: "medical", label: "医療・介護の備え", icon: "💊", desc: "いざという時のための準備" },
  { id: "digital", label: "デジタル遺産", icon: "💻", desc: "SNS・スマホ・ネット口座の整理方法" },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 6);

  return (
    <div>
      {/* ヒーローセクション */}
      <section
        className="rounded-2xl p-8 mb-10 text-white"
        style={{ background: "linear-gradient(135deg, #5c7a6e 0%, #3d5c52 100%)" }}
      >
        <p className="text-green-200 text-sm mb-2">介護・医療の現場経験者が書く</p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
          おひとり様のための<br />終活ガイド
        </h2>
        <p className="text-green-100 mb-6 leading-relaxed max-w-xl">
          「家族がいないから」と不安を感じていませんか？<br />
          一人だからこそ、早めに備えることで安心が生まれます。<br />
          現場経験をもとに、わかりやすくお伝えします。
        </p>
        <Link
          href="/blog"
          className="inline-block bg-white text-green-800 font-bold px-6 py-3 rounded-full hover:bg-green-50 transition-colors text-sm"
        >
          記事一覧を見る →
        </Link>
      </section>

      {/* カテゴリ一覧 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--primary)" }}>
          カテゴリから探す
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.id}`}
              className="rounded-xl p-4 hover:shadow-md transition-shadow no-underline"
              style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="font-bold text-sm mb-1" style={{ color: "var(--primary)" }}>{cat.label}</div>
              <div className="text-xs text-gray-500">{cat.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 新着記事 */}
      {recentPosts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--primary)" }}>
            新着記事
          </h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
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
                <h3 className="font-bold mb-1" style={{ color: "var(--foreground)" }}>{post.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{post.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 無料チェックリストCTA */}
      <section
        className="rounded-2xl p-6 text-center"
        style={{ background: "#fff8f0", border: "2px solid #c4956a" }}
      >
        <p className="text-2xl mb-2">📝</p>
        <h3 className="font-bold text-lg mb-2" style={{ color: "#8b5e3c" }}>
          無料：おひとり様の終活チェックリスト
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          何から始めればいいかわからない方へ。<br />
          20項目のチェックリストで今の状況を確認しましょう。
        </p>
        <Link
          href="/checklist"
          className="inline-block text-white font-bold px-6 py-3 rounded-full text-sm transition-opacity hover:opacity-90"
          style={{ background: "#c4956a" }}
        >
          無料チェックリストを見る
        </Link>
      </section>
    </div>
  );
}
