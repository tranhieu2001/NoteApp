import { CreateNewFolderOutlined } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { addNewFolder } from '../../utils/foldersUtils'

function NewFolder() {
  const [newFolderName, setNewFolderName] = useState()
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const popupName = searchParams.get('popup')

  const handleOpenPopup = () => {
    setSearchParams({ popup: 'add-folder' })
  }

  const handleClose = () => {
    navigate(-1)
    setNewFolderName('')
  }

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value)
  }

  const handleAddNewFolder = async () => {
    await addNewFolder({ name: newFolderName })

    handleClose()
  }

  useEffect(() => {
    if (popupName === 'add-folder') {
      setOpen(true)
      return
    }

    setOpen(false)
  }, [popupName])

  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopup}>
        <IconButton size="small">
          <CreateNewFolderOutlined sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: '400px' }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewFolder
