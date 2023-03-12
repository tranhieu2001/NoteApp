import { Avatar, Menu, Typography, MenuItem, Box } from '@mui/material'
import { useContext, useState } from 'react'

import { AuthContext } from '../context/AuthProvider'

function UserMenu() {
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext)
  
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleLogout = () => {
    auth.signOut()
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={handleClick}>
        <Typography>{displayName}</Typography>
        <Avatar
          alt="avatar"
          src={photoURL}
          sx={{ width: 24, height: 24, marginLeft: '5px' }}
        />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
