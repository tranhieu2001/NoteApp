import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { deleteFolder } from '../../utils/foldersUtils'

function DeleteFolder() {
  const { folderId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
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
    if (popupName === 'delete-folder') {
      setOpen(true)
      return
    }

    setOpen(false)
  }, [popupName])

  return (
    <div>
      <div onClick={handleOpenPopup}>
        <DeleteForeverIcon
          className="btn"
          sx={{ display: 'none', '&:hover': { color: 'rgb(0, 0, 0, 0.5)' } }}
        />
      </div>
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
  // return (
  //   <div onClick={handleDeleteFolder}>
  //     <DeleteForeverIcon
  //       className="btn"
  //       sx={{ display: 'none', '&:hover': { color: 'rgb(0, 0, 0, 0.5)' } }}
  //     />
  //   </div>
  // )
}

export default DeleteFolder
