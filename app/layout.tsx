import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "おひとり様の終活ノート",
    template: "%s | おひとり様の終活ノート",
  },
  description: "おひとり様のための終活情報をわかりやすくお届けします。遺言書・エンディングノート・死後事務委任など、一人でも安心して備えられる情報を発信中。",
  keywords: ["終活", "おひとり様", "遺言書", "エンディングノート", "死後事務委任", "身元保証", "独身", "一人暮らし"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "おひとり様の終活ノート",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <header style={{ background: "#5c7a6e" }} className="shadow-md">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-white no-underline">
              <div>
                <p className="text-xs text-green-100 mb-0.5">介護・医療の現場経験者が解説</p>
                <h1 className="text-xl font-bold text-white leading-tight">
                  🍃 おひとり様の終活ノート
                </h1>
              </div>
            </Link>
            <nav className="hidden sm:flex gap-4 text-sm text-green-100">
              <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
              <Link href="/blog" className="hover:text-white transition-colors">記事一覧</Link>
              <Link href="/about" className="hover:text-white transition-colors">このブログについて</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        <footer style={{ background: "#3d5c52", color: "#cde0d8" }} className="mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="text-white font-bold mb-2 text-sm">カテゴリ</h3>
                <ul className="text-sm space-y-1">
                  <li><Link href="/blog?category=will" className="hover:text-white transition-colors">遺言書・エンディングノート</Link></li>
                  <li><Link href="/blog?category=post-death" className="hover:text-white transition-colors">死後事務委任</Link></li>
                  <li><Link href="/blog?category=nursing-home" className="hover:text-white transition-colors">老人ホーム・施設</Link></li>
                  <li><Link href="/blog?category=digital" className="hover:text-white transition-colors">デジタル遺産</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 text-sm">このブログについて</h3>
                <p className="text-sm leading-relaxed">
                  介護・医療分野での現場経験をもとに、おひとり様が安心して終活に取り組めるよう情報を発信しています。
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 text-sm">免責事項</h3>
                <p className="text-sm leading-relaxed">
                  本ブログの情報は一般的な解説を目的としており、法的・専門的アドバイスではありません。個別の状況については専門家にご相談ください。
                </p>
              </div>
            </div>
            <div className="border-t border-green-700 pt-4 text-center text-xs">
              © 2025 おひとり様の終活ノート. 本サイトはアフィリエイト広告を含む場合があります。
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
