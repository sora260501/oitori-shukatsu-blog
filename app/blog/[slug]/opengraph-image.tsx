import { ImageResponse } from 'next/og'
import { getAllPosts } from '@/lib/posts'

export const runtime = 'nodejs'
export const alt = 'おひとり様の終活ノート'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === slug)

  const title = post?.title ?? 'おひとり様の終活ノート'
  const categoryLabel = post?.categoryLabel ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#3d5c52',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* 右上：カテゴリラベル */}
        {categoryLabel && (
          <div
            style={{
              position: 'absolute',
              top: '48px',
              right: '64px',
              background: '#5c7a6e',
              color: '#e0f0eb',
              fontSize: '22px',
              fontWeight: 500,
              padding: '8px 20px',
              borderRadius: '20px',
              letterSpacing: '0.03em',
            }}
          >
            {categoryLabel}
          </div>
        )}

        {/* 上部：サイト名 */}
        <p
          style={{
            color: '#b2d4c8',
            fontSize: '26px',
            fontWeight: 400,
            margin: '0 0 auto 0',
            letterSpacing: '0.04em',
          }}
        >
          おひとり様の終活ノート
        </p>

        {/* 中央：記事タイトル（最大2行分の高さで overflow hidden） */}
        <h1
          style={{
            color: '#ffffff',
            fontSize: '56px',
            fontWeight: 700,
            margin: '0',
            lineHeight: 1.4,
            letterSpacing: '0.02em',
            maxHeight: '160px',
            overflow: 'hidden',
          }}
        >
          {title}
        </h1>

        {/* 下部スペーサー */}
        <div style={{ marginTop: 'auto', height: '48px' }} />
      </div>
    ),
    {
      ...size,
    }
  )
}
