import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useLocation } from "react-router-dom"
import { Home as HomeIcon, Favorite as FavoriteIcon } from '@mui/icons-material'

export default function NavBar() {
    const location = useLocation()

    return (
        <AppBar position="static" sx={{ bgcolor: '#000000' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box
                    component={Link}
                    to="/"
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        textDecoration: 'none',
                        color: 'inherit' 
                    }}
                >
                    <img 
                        src="/src/assets/VCICON.svg"
                        alt="VideoClub Logo"
                        style={{ 
                            height: '45px',
                            width: '45px'
                        }} 
                    />
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 'bold'
                        }}
                    >
                        VideoClub
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        component={Link} 
                        to="/favorites" 
                        color="inherit"
                        startIcon={<FavoriteIcon />}
                        variant={location.pathname === '/favorites' ? 'outlined' : 'text'}
                    >
                        Library
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}