import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /IGTI React Module 4: Challenge/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders an input', () => {
    render(<Home />)

    const input = screen.getByPlaceholderText(/search/i)

    expect(input).toBeInTheDocument()
  })
})
