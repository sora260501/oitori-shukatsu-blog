import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import AffiliateBox from "@/app/components/AffiliateBox";

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
    openGraph: {
      url: `https://ohitori-shukatsu-blog.vercel.app/blog/${slug}`,
    },
  };
}

// slug別のアフィリエイト設定
const affiliateMap: Record<
  string,
  { title: string; description: string; href: string; label: string }
> = {
  "nursing-home-for-single": {
    title: "おすすめ：老人ホーム紹介サービス（無料）",
    description:
      "ケアマネ経験者のスタッフが、おひとり様に合った施設を無料でご提案します。",
    href: "#affiliate-link-placeholder",
    label: "無料で施設を探す",
  },
  "death-after-tasks-contract": {
    title: "おすすめ：死後事務委任契約の専門家に相談",
    description:
      "弁護士・司法書士による死後事務委任契約の無料相談。おひとり様の終活をトータルサポートします。",
    href: "#affiliate-link-placeholder",
    label: "専門家に無料相談する",
  },
  "will-for-single": {
    title: "おすすめ：遺言書作成を専門家にサポートしてもらう",
    description:
      "公正証書遺言の作成を司法書士・弁護士がサポート。費用・手続きの相談も無料で受け付けています。",
    href: "#affiliate-link-placeholder",
    label: "遺言書作成の相談はこちら",
  },
  "medical-care-for-single": {
    title: "おすすめ：身元保証サービスの資料請求",
    description:
      "入院・施設入居時の身元保証から死後事務まで一括サポート。まずは無料資料請求から。",
    href: "#affiliate-link-placeholder",
    label: "無料資料請求はこちら",
  },
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const affiliateData = affiliateMap[slug];

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

      {/* アフィリエイトボックス */}
      {affiliateData && (
        <AffiliateBox
          title={affiliateData.title}
          description={affiliateData.description}
          href={affiliateData.href}
          label={affiliateData.label}
        />
      )}

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
