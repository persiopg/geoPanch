'use client'
import axios from 'axios'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { useGeographic } from 'ol/proj'
import OSM from 'ol/source/OSM'
import { FC, useEffect, useRef, useState } from 'react'

const MapComponent: FC = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [dta, setDta] = useState<any | null>({})
  const [rNuber, setRNuber] = useState<Number | any>(0)

  const fetchData = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all')
      const data = response.data
      setDta(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
    setRNuber(getRandomNumber())
  }, [])

  function getRandomNumber() {
    const random = Math.random()
    const randomNumber = Math.floor(random * (200 - 1 + 1)) + 1
    return randomNumber
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGeographic()

    if (mapRef.current) {
      const lat = dta[rNuber]?.latlng?.[0]
      const lon = dta[rNuber]?.latlng?.[1]

      if (lat !== undefined && lon !== undefined) {
        const map = new Map({
          target: mapRef.current,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: [lon, lat],
            zoom: 4,
          }),
        })

        if (overlayRef.current) {
          const overlayElement = overlayRef.current
          overlayElement.style.position = 'absolute'
          overlayElement.style.backgroundColor = 'white'
          overlayElement.style.padding = '5px'
          overlayElement.style.borderRadius = '5px'
          overlayElement.innerHTML = dta[rNuber]?.translations.por.official

          const overlay = new Overlay({
            element: overlayElement,
            position: [lon, lat],
            positioning: 'top-center',
            stopEvent: false,
          })
          map.addOverlay(overlay)
        }
      }
    }
  }, [dta, rNuber])
  let obj = ''
  if (dta[rNuber]?.languages) {
    obj = dta[rNuber].languages
  }

  const arr = obj
    ? Object.keys(obj).map((key: string | any) => ({ key, value: obj[key] }))
    : []
  return (
    <>
      <div ref={mapRef} className="map-container"></div>
      <div ref={overlayRef} className="map-overlay"></div>
      <p>Nome comun: {dta[rNuber]?.translations.por.common}</p>
      <p>Nome Oficial: {dta[rNuber]?.translations.por.official}</p>
      {/* <p>{dta[rNuber]?.name?.common}</p> */}
      <p>Independente: {dta[rNuber]?.independent ? 'sim' : 'não'}</p>
      <p>Região: {dta[rNuber]?.region}</p>
      <p>Sub Região: {dta[rNuber]?.subregion}</p>
      <div>
        <p>Lingua: </p>
        {arr.map((l, index) => {
          return <p key={index}>*{l.value}</p>
        })}
      </div>
      <p>População: {dta[rNuber]?.population}</p>
      <p>Sigla FIFA: {dta[rNuber]?.fifa}</p>
      <p>
        Carros na:{' '}
        {dta[rNuber]?.car?.side === 'right' ? 'Mão francesa' : 'Mão inglesa'}
      </p>
      <div>
        <p>horaros(UTC): </p>
        {dta[rNuber]?.timezones.map((time: string, index: string) => {
          return <p key={index}>*{time}</p>
        })}
      </div>
      {/* <Image
        src={dta[rNuber]?.flags?.png}
        alt="Flag"
        width={300}
        height={300}
      />
      <Image
        src={dta[rNuber]?.coatOfArms?.png}
        alt="Coat of Arms"
        width={300}
        height={300}
      /> */}
      <img className="img" src={dta[rNuber]?.flags?.png} alt="Flag" />
      <img
        className="img"
        src={dta[rNuber]?.coatOfArms?.png}
        alt="Coat of Arms"
      />
    </>
  )
}

export default MapComponent
