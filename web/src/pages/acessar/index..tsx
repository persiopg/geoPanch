'use client'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import { useState } from 'react'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#7D00FF'),
  backgroundColor: '#7D00FF',
  '&:hover': {
    backgroundColor: '#5800B3',
  },
}))

const Home = () => {
  const [email, setEmail] = useState<String>('')
  const [senha, setSenha] = useState<String>('')
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }
  function verificar() {
    alert(`${email}  ${senha}`)
  }
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#8A19FF',
      }}
    >
      <Grid
        container
        rowSpacing={2}
        className="map-component"
        sx={{
          bgcolor: 'yellow',
          height: 'max-content',
          width: '350px',
          borderRadius: '12px',
          p: 5,
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color={'#FF580D'}
            sx={{ fontWeight: 'bold', fontSize: '24px' }}
          >
            Geo Panch
          </Typography>
          <Link href="/game">test</Link>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: '100%', bgcolor: 'white', borderRadius: '4px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            sx={{
              width: '100%',
              bgcolor: 'white',
              borderRadius: '4px',
            }}
            variant="outlined"
            onChange={(e) => setSenha(e.target.value)}
          >
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Link href="/novaSenha">Esqueceu sua senha?</Link>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '15px',
          }}
        >
          <Link href="/cadastro">Registrar</Link>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ColorButton variant="contained" onClick={verificar}>
            Acessar
          </ColorButton>
        </Grid>
      </Grid>
    </Box>
  )
}
export default Home
