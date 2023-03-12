import { NoteAddOutlined } from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
} from 'react-router-dom'
import moment from 'moment'

function NoteList() {
  const { noteId, folderId } = useParams()
  const { folder } = useLoaderData()
  const [activeNoteId, setActiveNoteId] = useState(noteId)
  const submit = useSubmit()
  const navigate = useNavigate()

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId)
      return
    }

    if (folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, folder.notes])

  const handleAddNewNote = () => {
    submit(
      {
        content: '',
        folderId: folderId,
      },
      {
        method: 'post',
        action: `/folders/${folderId}`,
      }
    )
  }

  return (
    <Grid container height="100%">
      <Grid
        item
        xs={4}
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: '#f0ebe3',
          height: '100%',
          padding: '10px',
          textAlign: 'left',
          overflowY: 'auto',
        }}
      >
        <List
          subheader={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{ fontWeight: 'bold', color: 'white', pb: '10px' }}
              >
                Note List
              </Typography>
              <Tooltip title="Add Note" onClick={handleAddNewNote}>
                <IconButton size="small">
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {folder.notes.map(({ id, content, updatedAt }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: 'none' }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    mb: '5px',
                    bgcolor:
                      id && id === activeNoteId ? 'rgb(255 211 140)' : null,
                  }}
                >
                  <CardContent
                    sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: 'bold' }}
                      dangerouslySetInnerHTML={{
                        __html: content.substring(0, 30) || 'Empty',
                      }}
                    ></div>
                    <Typography sx={{ fontSize: '10px' }}>
                      {`Last updated at ${moment(updatedAt).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default NoteList
