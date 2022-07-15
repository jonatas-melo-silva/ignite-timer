import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function DefaultLayout(): ReactElement {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
