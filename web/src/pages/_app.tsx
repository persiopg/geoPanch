import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // eslint-disable-next-line no-unused-vars
  const router = useRouter()

  // Aqui você pode adicionar qualquer lógica global que precisa ser aplicada a todas as páginas

  return <Component {...pageProps} />
}

export default MyApp
