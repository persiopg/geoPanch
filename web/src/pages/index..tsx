'use client'
import { Box, Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Link from 'next/link'
import Logo from '../components/logaPanch'

// const ColorButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.getContrastText('#7D00FF'),
//   backgroundColor: '#7D00FF',
//   '&:hover': {
//     backgroundColor: '#5800B3',
//   },
// }))

function createData(name: string, pontos: number) {
  return { name, pontos }
}

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
]

const Home = () => {
  // const [email, setEmail] = useState<String>('')
  // const [senha, setSenha] = useState<String>('')
  // const [showPassword, setShowPassword] = useState(false)

  // const handleClickShowPassword = () => setShowPassword((show) => !show)

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>,
  // ) => {
  //   event.preventDefault()
  // }
  // function verificar() {
  //   alert(`${email}  ${senha}`)
  // }
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#8A19FF',
        p: 0,
        m: 0,
      }}
    >
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        className="map-component"
        sx={{
          bgcolor: 'yellow',
          height: 'max-content',
          width: '90%',
          borderRadius: '12px',
          m: 5,
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Logo />
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h5"
            color={'#FF580D'}
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            Modo normal
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Jogador</TableCell>
                  <TableCell align="left">Pontos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any, i: number) => {
                  if (i < 10) {
                    return (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.pontos}</TableCell>
                      </TableRow>
                    )
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h5"
            color={'#FF580D'}
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            desafio de tempo
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Jogador</TableCell>
                  <TableCell align="left">Pontos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => {
                  if (i < 10) {
                    return (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.pontos}</TableCell>
                      </TableRow>
                    )
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid
            container
            rowSpacing={2}
            className="map-component"
            sx={{
              bgcolor: ' #5800B3',
              height: '90%',
              width: '90%',
              borderRadius: '12px',
              p: 5,
            }}
          >
            <Grid item xs={12}>
              <Link href="/game">
                <Box
                  sx={{
                    bgcolor: '#7D00FF',
                    textDecoration: 'none',
                    color: 'white',
                    height: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '12px',
                    ':hover': {
                      bgcolor: '#8A19FF',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Novo game
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="/game?time=true">
                <Box
                  sx={{
                    bgcolor: '#7D00FF',
                    textDecoration: 'none',
                    color: 'white',
                    height: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '12px',
                    ':hover': {
                      bgcolor: '#8A19FF',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Desafio contra o tempo
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
export default Home
