/* eslint-disable @next/next/no-img-element */
'use client'
import { Button, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { useGeographic } from 'ol/proj'
import OSM from 'ol/source/OSM'
import { FC, useEffect, useRef, useState } from 'react'
import './globals.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const MapComponent: FC = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [dta, setDta] = useState<any | null>({})
  const [rNuber, setRNuber] = useState<Number | any>(0)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGeographic()

    if (open) {
      createMap()
    }
  }, [open])

  function getRandomNumber() {
    const random = Math.random()
    const randomNumber = Math.floor(random * (200 - 1 + 1)) + 1
    return randomNumber
  }

  function createMap() {
    setTimeout(() => {
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
    }, 100)
  }

  let obj = ''
  if (dta[rNuber]?.languages) {
    obj = dta[rNuber].languages
  }

  const arr = obj
    ? Object.keys(obj).map((key: string | any) => ({ key, value: obj[key] }))
    : []

  return (
    <Box>
      <Grid container spacing={2} className="map-component">
        <Grid item xs={12}>
          <Typography variant="body1">
            Nome comun: {dta[rNuber]?.translations.por.common}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Nome Oficial: {dta[rNuber]?.translations.por.official}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Independente: {dta[rNuber]?.independent ? 'sim' : 'não'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Região: {dta[rNuber]?.region}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Sub Região: {dta[rNuber]?.subregion}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Lingua:</Typography>
          <ul>
            {arr.map((l, index) => (
              <li key={index}>{l.value}</li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            População: {dta[rNuber]?.population}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Sigla FIFA: {dta[rNuber]?.fifa}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Carros na:{' '}
            {dta[rNuber]?.car?.side === 'right'
              ? 'Mão francesa'
              : 'Mão inglesa'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Horários (UTC):</Typography>
          <ul>
            {dta[rNuber]?.timezones.map((time: string, index: string) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          <img className="img" src={dta[rNuber]?.flags?.png} alt="Flag" />
          <img
            className="img"
            src={dta[rNuber]?.coatOfArms?.png}
            alt="Coat of Arms"
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleOpen}>Open modal</Button>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={2} className="map-component">
              <Grid item xs={12}>
                <div ref={mapRef} className="map-container"></div>
                <div ref={overlayRef} className="map-overlay"></div>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Grid>
    </Box>
  )
}

export default MapComponent
