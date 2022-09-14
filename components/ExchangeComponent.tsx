import Image from 'next/image'
import { useState } from 'react'
import Exchange from '../models/Exchange'

type ExchangeProps = {
  data: Exchange
}

export default function ExchangeComponent({ data }: ExchangeProps) {
  const [imageSrc, setImageSrc] = useState(data.image)

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Image
          src={
            imageSrc.startsWith('http') ? imageSrc : '/no-image-available.png'
          }
          width={50}
          height={50}
          placeholder="blur"
          blurDataURL="/no-image-available.png"
          onError={() => {
            setImageSrc('/no-image-available.png')
          }}
        />
        <h3 style={{ marginLeft: 10 }}>{data.name}</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <label htmlFor={`score-${data.id}`}>Trust Score: </label>
          <code id={`score-${data.id}`}>{data.trust_score}</code>
        </div>
        <div>
          <label htmlFor={`volume-${data.id}`}>Trade Volume (24h): </label>

          <code id={`volume-${data.id}`}>
            {data.trade_volume_24h_btc.toFixed(2)}
          </code>
        </div>
        <div>
          <label htmlFor={`year-${data.id}`}>Year: </label>

          <code id={`year-${data.id}`}>{data.year_established}</code>
        </div>
        <div>
          <label htmlFor={`country-${data.id}`}>Country: </label>

          <code id={`country-${data.id}`}>{data.country}</code>
        </div>
      </div>
    </>
  )
}
