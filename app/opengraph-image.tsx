import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'おひとり様の終活ノート'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#5c7a6e',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 上部：サブテキスト */}
        <p
          style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 400,
            margin: '0 0 40px 0',
            letterSpacing: '0.05em',
            opacity: 0.85,
          }}
        >
          介護・医療の現場経験者が解説
        </p>

        {/* 中央：サイト名 */}
        <h1
          style={{
            color: '#ffffff',
            fontSize: '68px',
            fontWeight: 700,
            margin: '0 0 48px 0',
            textAlign: 'center',
            lineHeight: 1.2,
            letterSpacing: '0.02em',
          }}
        >
          🍃 おひとり様の終活ノート
        </h1>

        {/* 下部：説明文 */}
        <p
          style={{
            color: '#b2d4c8',
            fontSize: '30px',
            fontWeight: 400,
            margin: 0,
            textAlign: 'center',
            letterSpacing: '0.03em',
          }}
        >
          家族がいなくても安心できる終活情報を発信中
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
