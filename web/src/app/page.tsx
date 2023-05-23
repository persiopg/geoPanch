'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [dta, setDta] = useState<any | null>({})
  const [rNuber, setRNuber] = useState<Number | any>(0)
  const fetchData = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all')
      const data = response.data
      // Faça o processamento dos dados recebidos da API
      console.log(data)
      console.log(data.map((item: any) => item.region))

      setDta(data)
      console.log(dta)
    } catch (error) {
      // Trate os erros de requisição
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData()
    setRNuber(getRandomNumber())
  }, [])

  function getRandomNumber() {
    // Gera um número aleatório entre 0 e 1
    const random = Math.random()

    // Calcula o número aleatório dentro do intervalo especificado
    const randomNumber = Math.floor(random * (200 - 1 + 1)) + 1

    return randomNumber
  }
  let obj = { aqui: '' }
  if (dta[rNuber]?.languages) {
    obj = dta[rNuber].languages
  }

  const arr = obj
    ? Object.keys(obj).map((key) => ({ key, value: obj[key] }))
    : []

  console.log(dta[rNuber]?.independent)

  return (
    <>
      <p>{dta[rNuber]?.name.common}</p>
      <p>{dta[rNuber]?.independent ? 'sim' : 'nao'}</p>
      <h1>{dta[rNuber]?.region}</h1>
      <h1>{dta[rNuber]?.subregion}</h1>
      <h1>{arr[0].value}</h1>
      <h1>{dta[rNuber]?.population}</h1>
      <h1>{dta[rNuber]?.fifa}</h1>
      <h1>{dta[rNuber]?.car.side}</h1>
      <h1>{dta[rNuber]?.timezones[0]}</h1>
      <img src={`${dta[rNuber]?.flags.png}`} />
      {/* <h1>{dta[rNuber]?.flags.png}</h1> */}
      <img src={`${dta[rNuber]?.coatOfArms.png}`} />
      {/* <h1>{dta[rNuber]?.coatOfArms.png}</h1> */}
    </>
  )
}
