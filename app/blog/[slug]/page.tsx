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
    title: "参考：厚生労働省 介護事業所・生活関連情報検索",
    description:
      "全国の介護施設・サービスを公的機関のデータベースで検索できます。施設の種類・所在地・サービス内容を確認できます。",
    href: "https://www.kaigokensaku.mhlw.go.jp/",
    label: "介護施設を探す（厚生労働省）",
  },
  "death-after-tasks-contract": {
    title: "参考：日本司法書士会連合会",
    description:
      "死後事務委任契約や遺言書作成の相談窓口を探せます。全国の司法書士に相談できます。",
    href: "https://www.shiho-shoshi.or.jp/",
    label: "司法書士会の公式サイトを見る",
  },
  "will-for-single": {
    title: "参考：日本公証人連合会",
    description:
      "公正証書遺言の作成は全国の公証役場で行えます。公証役場の所在地・手続きはこちらで確認できます。",
    href: "https://www.koshonin.gr.jp/",
    label: "公証役場を探す",
  },
  "medical-care-for-single": {
    title: "参考：全国身元保証協会",
    description:
      "入院・施設入居時の身元保証サービスを提供する団体の一覧・情報を確認できます。",
    href: "https://zenshin-kyokai.or.jp/",
    label: "身元保証について詳しく見る",
  },
  "funeral-for-single": {
    title: "おすすめ：みんなの海洋散骨（無料見積もり）",
    description:
      "全国海域対応・粉骨費用込み・追加費用なしの安心の葬送業者。海洋散骨や遺骨の供養についてまず無料で見積もりを。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3GYI+1FSQEQ+4P1A+5Z6WX",
    label: "無料見積もりはこちら",
  },
  "funeral-grave-for-single": {
    title: "おすすめ：みんなの海洋散骨（無料見積もり）",
    description:
      "全国海域対応・粉骨費用込み・追加費用なしの安心の葬送業者。海洋散骨や遺骨の供養についてまず無料で見積もりを。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3GYI+1FSQEQ+4P1A+5Z6WX",
    label: "無料見積もりはこちら",
  },
  "no-heir-for-single": {
    title: "おすすめ：みんなの海洋散骨（無料見積もり）",
    description:
      "相続人がいないおひとり様に。全国海域対応の海洋散骨サービス。粉骨費用込み・追加費用なしで安心です。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3GYI+1FSQEQ+4P1A+5Z6WX",
    label: "無料見積もりはこちら",
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
