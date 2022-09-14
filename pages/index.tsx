import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import styles from 'styled-components'

interface Exchange {
  id: string
  name: string
  image: string
  year_established: number
  country: string
  trust_score: string
  trade_volume_24h_btc: number
}

const CardsContainer = styles.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px;
`

const Card = styles.div`
  width: 300px;
  height: 200px;
  /*text-align: center;*/
  box-shadow: 2px 2px 4px;
  margin: 40px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // background-color: #8ac690;
  // color: #ffd9fb;
`

export default function Home() {
  const { data, error } = useSWR<Exchange[]>(
    'https://api.coingecko.com/api/v3/exchanges/?per_page=100&page=1',
    async (path: string) => {
      return await fetch(path).then((res) => res.json())
    }
  )

  console.log(data)

  return (
    <div>
      <Head>
        <title>IGTI React Mod4Des</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ margin: '0 200px' }}>
        <h1>IGTI React Module 4: Challenge</h1>

        <input placeholder="Search by name" />

        {data ? (
          <CardsContainer>
            {data.map((e) => (
              <Card key={e.id}>
                <div style={{ display: 'flex' }}>
                  <Image src={e.image} width={50} height={50} />
                  <h3 style={{ marginLeft: 10 }}>{e.name}</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <label htmlFor={`score-${e.id}`}>Trust Score: </label>
                    <code id={`score-${e.id}`}>{e.trust_score}</code>
                  </div>
                  <div>
                    <label htmlFor={`volume-${e.id}`}>
                      Trade Volume (24h):{' '}
                    </label>

                    <code id={`volume-${e.id}`}>
                      {e.trade_volume_24h_btc.toFixed(2)}
                    </code>
                  </div>
                  <div>
                    <label htmlFor={`year-${e.id}`}>Year: </label>

                    <code id={`year-${e.id}`}>{e.year_established}</code>
                  </div>
                  <div>
                    <label htmlFor={`country-${e.id}`}>Country: </label>

                    <code id={`country-${e.id}`}>{e.country}</code>
                  </div>
                </div>
              </Card>
            ))}
          </CardsContainer>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </div>
  )
}
