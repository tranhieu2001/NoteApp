import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { deleteFolder } from '../../utils/foldersUtils'

function DeleteFolder({ folderId }) {
  const { folderId: currentFolderId } = useParams()
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const popupName = searchParams.get('popup')
  const handleOpenPopup = () => {
    setSearchParams({ popup: 'delete-folder' })
  }

  const handleClose = () => {
    navigate(-1)
  }

  const handleDeleteFolder = async () => {
    await deleteFolder(folderId)
    navigate('/')
  }

  useEffect(() => {
    if (popupName === 'delete-folder' && folderId === currentFolderId) {
      setOpen(true)
      return
    }

    setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupName])

  return (
    <div>
      <Tooltip title="Delete Folder" onClick={handleOpenPopup}>
        <DeleteForeverIcon
          sx={{
            '&:hover': { color: 'rgb(0, 0, 0, 0.5)' },
            cursor: 'pointer',
          }}
        />
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {'Are you sure you want to delete this folder?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteFolder} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteFolder
