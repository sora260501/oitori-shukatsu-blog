import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このブログについて",
  description: "おひとり様の終活ノートの運営者情報と、ブログの目的についてご紹介します。",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--primary)" }}>
        このブログについて
      </h1>

      <div
        className="rounded-2xl p-6 mb-8"
        style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white font-bold"
            style={{ background: "var(--primary)" }}
          >
            🍃
          </div>
          <div>
            <p className="font-bold text-lg">終活ノート管理人</p>
            <p className="text-sm text-gray-500">介護・医療分野での現場経験者</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          介護・医療の現場で働く中で、「おひとり様」の終活に関する情報が少ないことに気づきました。
          家族がいない方が安心して老後・終活に備えられるよう、現場で見てきたリアルな情報をお伝えします。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3" style={{ color: "var(--primary)" }}>
          このブログを始めた理由
        </h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-3">
          終活に関する情報の多くは「家族がいる前提」で書かれています。
          しかし現場では、身元保証人がいなくて施設入居できない方、亡くなった後の手続きをしてくれる人がいない方を多く見てきました。
        </p>
        <p className="text-sm leading-relaxed text-gray-700">
          「一人だから仕方ない」ではなく、「一人だからこそ早めに準備できる」という視点で、
          実践的な情報を発信していきたいと思っています。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3" style={{ color: "var(--primary)" }}>
          免責事項
        </h2>
        <p className="text-sm leading-relaxed text-gray-500">
          本ブログの情報は一般的な解説を目的としており、法的・医療的アドバイスではありません。
          個別の状況については、弁護士・司法書士・ケアマネジャーなどの専門家にご相談ください。
          また本サイトはアフィリエイト広告プログラムに参加しており、紹介料を受け取ることがあります。
        </p>
      </section>
    </div>
  );
}
