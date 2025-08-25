import './css/App.css'
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914',
    },
    secondary: {
      main: '#646cff',
    },
    background: {
      default: '#242424',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <NavBar />
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/favorites" element={<Favorites />}/>
          </Routes>
        </Container>
      </MovieProvider>
    </ThemeProvider>
  )
}

export default App
