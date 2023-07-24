import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import imgPanch from '../../assets/Panchzerabraba.jpg'

export default function logo() {
  return (
    <Link href={'/'}>
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          paddingTop: -15,
          bgcolor: '#E8D20C',
          width: 'max-content',
          border: '1px solid #FF1E19',
          borderRadius: '110px',
          ':hover': {
            bgcolor: '#FFFF00',
            transition: 'all 1s ease-in-out',
          },
        }}
      >
        <Image
          src={imgPanch}
          alt="Landscape picture"
          width={100}
          height={100}
          style={{ borderRadius: '50%', marginRight: '15px' }}
        />
        <Typography
          variant="body1"
          color={'#FF580D'}
          sx={{
            fontWeight: 'bold',
            fontSize: '24px',
            paddingRight: '15px',
          }}
        >
          Geo Panch
        </Typography>
      </Box>
    </Link>
  )
}
