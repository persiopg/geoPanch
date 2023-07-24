'use client'
import { Box, Grid, Typography } from '@mui/material'
import Link from 'next/link'

const Home = () => {
  return (
    <Box>
      <Grid container spacing={2} className="map-component">
        <Grid item xs={12}>
          <Typography variant="body1">home</Typography>
          <Link href="/game">test</Link>
        </Grid>
      </Grid>
    </Box>
  )
}
export default Home
