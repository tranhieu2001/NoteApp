import { Card, CardContent, List, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import NewFolder from './NewFolder'
import DeleteFolder from './DeleteFolder'
import RenameFolder from './RenameFolder'

function FolderList({ folders }) {
  const { folderId } = useParams()
  const [activeFolderId, setActiveFolderId] = useState(folderId)

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: '#7d9d9c',
        height: '100%',
        padding: '10px',
        textAlign: 'left',
        overflowY: 'auto',
      }}
      subheader={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
            Folders
          </Typography>
          <NewFolder />
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{
              textDecoration: 'none',
            }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
                mb: '5px',
                bgcolor: id === activeFolderId ? 'rgb(255 211 140)' : null,
                transition: 'background-color ease-in-out 200ms',
                '&:hover': { bgcolor: '#dddddd' },
                '&:hover .btn': { display: 'block' },
              }}
            >
              <CardContent
                sx={{
                  '&:last-child': { pb: '10px' },
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                  {name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <RenameFolder name={name} />
                  <DeleteFolder />
                </Box>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </List>
  )
}

export default FolderList
