import { Card, CardContent, List, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import DeleteFolder from './DeleteFolder'
import NewFolder from './NewFolder'
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
          <Box
            key={id}
            position="relative"
            sx={{
              '&:hover .btn': { display: 'flex' },
            }}
          >
            <Link
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
                </CardContent>
              </Card>
            </Link>
            <Box
              className="btn"
              sx={{
                height: '100%',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0',
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              <Box px={0.5}>
                <RenameFolder folderId={id} />
              </Box>
              <Box px={0.5}>
                <DeleteFolder folderId={id} />
              </Box>
            </Box>
          </Box>
        )
      })}
    </List>
  )
}

export default FolderList
