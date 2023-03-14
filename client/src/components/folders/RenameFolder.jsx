import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { renameFolder } from '../../utils/foldersUtils'

function RenameFolder({ name }) {
  const { folderId } = useParams()
  const [folderName, setFolderName] = useState(name)
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const popupName = searchParams.get('popup')

  const handleOpenPopup = () => {
    setSearchParams({ popup: 'rename-folder' })
  }

  const handleClose = () => {
    navigate(-1)
    setFolderName('')
  }

  const handleRenameFolderNameChange = (e) => {
    setFolderName(e.target.value)
  }

  const handlerenameFolder = async () => {
    await renameFolder({ folderId, folderName })

    handleClose()
  }

  useEffect(() => {
    if (popupName === 'rename-folder') {
      setOpen(true)
      return
    }

    setOpen(false)
  }, [popupName])

  return (
    <div>
      <div onClick={handleOpenPopup}>
        <ModeEditIcon
          className="btn"
          sx={{ display: 'none', '&:hover': { color: 'rgb(0, 0, 0, 0.5)' } }}
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rename Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: '400px' }}
            autoComplete="off"
            value={folderName}
            onChange={handleRenameFolderNameChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlerenameFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RenameFolder
