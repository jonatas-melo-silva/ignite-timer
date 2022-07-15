import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Container } from './styles'

export function DefaultLayout(): ReactElement {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}
