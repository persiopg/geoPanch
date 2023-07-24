/* eslint-disable @next/next/no-img-element */
'use client'
import { Button, Grid, InputBase, Typography, styled } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { useGeographic } from 'ol/proj'
import OSM from 'ol/source/OSM'
import { useEffect, useRef, useState } from 'react'
import LogoPanch from '../../components/logaPanch'

import { useRouter } from 'next/router'
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
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#7D00FF'),
  backgroundColor: '#7D00FF',
  '&:hover': {
    backgroundColor: '#5800B3',
  },
}))

const GamePage = () => {
  const { query } = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [dta, setDta] = useState<any | null>({})
  const [rNuber, setRNuber] = useState<Number | any>(0)
  const [open, setOpen] = useState(false)
  const [dica, setDica] = useState<Array<any>>([])
  const [seconds, setSeconds] = useState(600)
  const [contDicas, setContDicas] = useState<number>(-1)
  const [arraydica, setArraydica] = useState<any>([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setRNuber(getRandomNumber())
    setContDicas(-1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [seconds])

  const fetchData = async () => {
    try {
      const nomesAux: any = []
      const response = await axios.get('https://restcountries.com/v3.1/all')
      const data = response.data
      data.map((i: any) => nomesAux.push(i.translations.por.common))

      setDta(data)
    } catch (error) {
      console.error(error)
    }
  }

  // console.log(nomes)

  useEffect(() => {
    fetchData()
    setRNuber(getRandomNumber())
    // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    dicas(dta[rNuber])
    // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  }, [dta[rNuber]])
  useEffect(() => {
    renderizaDicas()
    // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  }, [contDicas])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGeographic()

    if (open) {
      createMap()
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  }, [open])

  const renderizaDicas = () => {
    const arraydica: Array<any> = []
    console.log(contDicas)
    console.log(dica.length)

    if (contDicas !== dica.length) {
      for (let index = 0; index <= contDicas; index++) {
        console.log(dica)

        const element = dica[index]
        arraydica.push(element)
      }
      setArraydica(arraydica)
    } else {
      alert('voce perdeu')
      setOpen(true)
    }
  }

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
    }, 500)
  }
  const dicas = async (pais: any | null) => {
    const auxArryDicas = []
    let obj = ''
    if (pais?.languages) {
      obj = pais.languages
    }

    const arr = obj
      ? Object.keys(obj).map((key: string | any) => ({ key, value: obj[key] }))
      : []
    console.log(pais)
    auxArryDicas.push(
      <Typography variant="body1">area : {dta[rNuber]?.area}</Typography>,
    )
    auxArryDicas.push(
      <Typography variant="body1">
        capital: {dta[rNuber]?.capital[0]}
      </Typography>,
    )

    auxArryDicas.push(
      <Typography variant="body1">
        Independente: {dta[rNuber]?.independent ? 'sim' : 'não'}
      </Typography>,
    )
    auxArryDicas.push(
      <Typography variant="body1">Região: {dta[rNuber]?.region}</Typography>,
    )
    auxArryDicas.push(
      <Typography variant="body1">
        Sub Região: {dta[rNuber]?.subregion}
      </Typography>,
    )
    auxArryDicas.push(
      <>
        <Typography variant="body1">Lingua:</Typography>
        <ul>
          {arr.map((l, index) => (
            <li key={index}>{l.value}</li>
          ))}
        </ul>
      </>,
    )
    auxArryDicas.push(
      <Typography variant="body1">
        População: {dta[rNuber]?.population}
      </Typography>,
    )
    auxArryDicas.push(
      <Typography variant="body1">Sigla FIFA: {dta[rNuber]?.fifa}</Typography>,
    )
    auxArryDicas.push(
      <Typography variant="body1">
        Carros na:{' '}
        {dta[rNuber]?.car?.side === 'right' ? 'Mão francesa' : 'Mão inglesa'}
      </Typography>,
    )
    auxArryDicas.push(
      <>
        <Typography variant="body1">Horários (UTC):</Typography>
        <ul>
          {dta[rNuber]?.timezones.map((time: string, index: string) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </>,
    )
    auxArryDicas.push(
      <>
        <Typography variant="body1">Bandeira:</Typography>
        <img className="img" src={dta[rNuber]?.flags?.png} alt="Flag" />
      </>,
    )
    // auxArryDicas.push(
    //   <>
    //     <Typography variant="body1">Bandeira Forças Armadas:</Typography>
    //     <img
    //       className="img"
    //       src={dta[rNuber]?.coatOfArms?.svg}
    //       alt="Coat of Arms"
    //     />
    //   </>,
    // )
    setDica(shuffleArray(auxArryDicas))
  }
  function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  const checaDica = () => {
    setContDicas(contDicas + 1)
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: 'max-content',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#8A19FF',
        p: 0,
        m: 0,
      }}
    >
      <LogoPanch />
      <Grid
        container
        spacing={2}
        className="map-component"
        sx={{
          bgcolor: 'yellow',
          height: '80%',
          width: '90%',
          borderRadius: '12px',
          m: 5,
          p: 15,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Qual é o Pais? dicas restantes: {10 - contDicas}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <InputBase
            sx={{
              width: '80%',
              height: '50px',
              bgcolor: 'white',
              borderRadius: '4px',
              px: 2.5,
            }}
            placeholder="Pais"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <ColorButton
            variant="contained"
            sx={{ width: '20%', height: '50px' }}
            onClick={checaDica}
          >
            Acessar
          </ColorButton>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container rowSpacing={3}>
                {arraydica.map((item: any, index: any) => {
                  return (
                    <Grid item xs={12} key={index}>
                      {item}
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            {query.time === 'true' && (
              <Grid item xs={6}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h1">
                    {seconds === 0 ? (
                      <p>Cronômetro finalizado!</p>
                    ) : (
                      <p>{`${Math.floor(seconds / 60)}:${
                        seconds % 60 < 10 ? '0' : ''
                      }${seconds % 60}`}</p>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
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

export default GamePage
