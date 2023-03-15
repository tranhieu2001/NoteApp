import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { renameFolder } from '../../utils/foldersUtils'

function RenameFolder({ folderId }) {
  const { folderId: currentFolderId } = useParams()
  const [folderName, setFolderName] = useState()
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
    if (popupName === 'rename-folder' && folderId === currentFolderId) {
      setOpen(true)
      return
    }

    setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupName])

  return (
    <div>
      <Tooltip title="Rename Folder" onClick={handleOpenPopup}>
        <ModeEditIcon
          sx={{
            '&:hover': { color: 'rgb(0, 0, 0, 0.5)' },
            cursor: 'pointer',
          }}
        />
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rename Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
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
