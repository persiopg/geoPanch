'use client'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Grid, Typography } from '@mui/material'
import Link from 'next/link'

const NovaSenha = () => {
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
        spacing={0}
        className="map-component"
        sx={{
          bgcolor: 'yellow',
          height: '350px',
          width: '350px',
          borderRadius: '12px',
          p: 5,
        }}
      >
        <Grid item xs={12}>
          <Link href="/">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <ArrowBackIcon />
              Voltar
            </Box>
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="h1"
            color={'#FF580D'}
            sx={{ textAlign: 'center' }}
          >
            se Ferrou
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
export default NovaSenha
