type Props = {
  title: string;
  description: string;
  href: string;
  label: string;
  badge?: string;
};

export default function AffiliateBox({
  title,
  description,
  href,
  label,
  badge = "PR",
}: Props) {
  return (
    <div
      style={{
        background: "#fff8f0",
        border: "1px solid #c4956a",
        borderRadius: "12px",
        padding: "20px 24px",
        position: "relative",
        marginTop: "32px",
        marginBottom: "32px",
      }}
    >
      {/* PRバッジ */}
      <span
        style={{
          position: "absolute",
          top: "10px",
          left: "12px",
          fontSize: "10px",
          background: "#d1d5db",
          color: "#4b5563",
          borderRadius: "4px",
          padding: "1px 6px",
          fontWeight: 500,
        }}
      >
        {badge}
      </span>

      {/* タイトル */}
      <p
        style={{
          fontWeight: "bold",
          color: "#8b5e3c",
          fontSize: "16px",
          marginTop: "20px",
          marginBottom: "8px",
        }}
      >
        {title}
      </p>

      {/* 説明文 */}
      <p
        style={{
          fontSize: "13px",
          color: "#6b7280",
          marginBottom: "16px",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>

      {/* ボタン */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        style={{
          display: "inline-block",
          background: "#c4956a",
          color: "#ffffff",
          borderRadius: "8px",
          padding: "10px 24px",
          fontSize: "14px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        {label}
      </a>
    </div>
  );
}
