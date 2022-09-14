import Head from 'next/head'
import useSWR from 'swr'
import styles from 'styled-components'
import Exchange from 'models/Exchange'
import ExchangeComponent from '../components/ExchangeComponent'
import { useEffect, useState } from 'react'

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
  const [search, setSearch] = useState('')
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const { data, error } = useSWR<Exchange[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges/?per_page=100&page=${currentPage}`,
    async (path: string) => {
      return await fetch(path).then((res) => res.json())
    }
  )

  useEffect(() => {
    setExchanges(data ?? [])
  }, [data])

  function onChangeSearch(search: string) {
    setSearch(search)

    const exchanges =
      data?.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      ) ?? []

    setExchanges(exchanges)
  }

  function onClickDecrement() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function onClickIncrement() {
    if (data?.length === 100) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div>
      <Head>
        <title>IGTI React Mod4Des</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ margin: '0 200px' }}>
        <h1>IGTI React Module 4: Challenge</h1>

        <div style={{ margin: '1.5rem', whiteSpace: 'nowrap' }}>
          <button onClick={onClickDecrement} disabled={currentPage === 1}>
            {'<'}
          </button>
          <span style={{ margin: '1rem' }}>Page {currentPage}</span>
          <button
            onClick={onClickIncrement}
            disabled={!!exchanges.length && exchanges.length < 100}
          >
            {'>'}
          </button>
        </div>

        <div>
          <input
            placeholder="Search by name"
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
          />

          {!search ? (
            <div>&nbsp;</div>
          ) : (
            <div
              style={{ textAlign: 'center' }}
            >{`${exchanges.length} of ${data?.length} items`}</div>
          )}
        </div>

        {exchanges ? (
          <CardsContainer>
            {exchanges.map((e) => (
              <Card key={e.id}>
                <ExchangeComponent data={e} />
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
