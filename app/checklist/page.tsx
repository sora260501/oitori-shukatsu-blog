import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "おひとり様の終活チェックリスト",
  description: "おひとり様が終活で準備すべき20項目のチェックリスト。今の状況を確認して、何から始めるべきかを明確にしましょう。",
};

const checklistItems = [
  {
    category: "基本情報の整理",
    items: [
      "エンディングノートを持っている（または作成予定）",
      "緊急連絡先リストを作成している",
      "かかりつけ医・服薬情報をまとめている",
      "保険証・マイナンバーカードの保管場所を把握している",
    ],
  },
  {
    category: "財産・お金の整理",
    items: [
      "銀行口座の一覧を作成している",
      "保険の契約内容を把握している",
      "不動産・株などの資産をリスト化している",
      "借金・ローンの有無を整理している",
    ],
  },
  {
    category: "デジタル情報の整理",
    items: [
      "スマートフォンのパスワードを信頼できる方法で残している",
      "SNSアカウントの扱い方を決めている",
      "ネット銀行・証券口座の一覧を残している",
      "サブスクサービスの一覧を把握している",
    ],
  },
  {
    category: "死後の手続き",
    items: [
      "葬儀の希望（形式・場所・費用）を決めている",
      "お墓・納骨の希望を決めている",
      "死後事務委任契約を検討・契約している",
      "遺言書を作成している（または検討中）",
    ],
  },
  {
    category: "医療・介護の備え",
    items: [
      "延命治療についての意思を書面に残している",
      "身元保証人（またはサービス）を確保している",
      "入居したい施設の種類・エリアをイメージしている",
      "任意後見契約を検討している",
    ],
  },
];

export default function ChecklistPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--primary)" }}>
        おひとり様の終活チェックリスト
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        全20項目。今の状況を確認して、優先的に取り組むべきことを明確にしましょう。
      </p>

      <div className="space-y-6">
        {checklistItems.map((section, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="px-4 py-3" style={{ background: "var(--primary)" }}>
              <h2 className="text-white font-bold text-sm">{section.category}</h2>
            </div>
            <div className="p-4 space-y-3" style={{ background: "white" }}>
              {section.items.map((item, j) => (
                <label key={j} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded accent-green-700 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-8 rounded-xl p-5 text-sm text-gray-600"
        style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
      >
        <p className="font-bold mb-2" style={{ color: "var(--primary)" }}>💡 チェックできなかった項目について</p>
        <p>
          チェックできない項目が多くても心配しないでください。
          終活は一度にすべてやる必要はありません。まずは「エンディングノートの作成」と「緊急連絡先の整理」から始めてみましょう。
        </p>
      </div>
    </div>
  );
}
