import { Logout } from '@mui/icons-material'
import { Avatar, Menu, Typography, MenuItem, Box } from '@mui/material'
import { useContext, useState } from 'react'

import { AuthContext } from '../context/AuthProvider'

function UserMenu() {
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    auth.signOut()
  }
  return (
    <>
      <Box
        sx={{ display: 'flex', cursor: 'pointer', pr: '10px' }}
        onClick={handleClick}
      >
        <Typography>{displayName}</Typography>
        <Avatar
          alt="avatar"
          src={photoURL}
          sx={{ width: 24, height: 24, marginLeft: '5px' }}
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableAutoFocusItem
      >
        <MenuItem onClick={handleLogout}>
          <Logout /> Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
