import { Card, CardContent, List, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  BoxButton,
  BoxButtons,
  BoxItem,
  CardContentItem,
  CardItem,
} from '../StyledComponent'

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
          <BoxItem key={id}>
            <Link
              to={`folders/${id}`}
              style={{
                textDecoration: 'none',
              }}
              onClick={() => setActiveFolderId(id)}
            >
              <CardItem
                sx={{
                  bgcolor: id === activeFolderId ? 'rgb(255 211 140)' : null,
                }}
              >
                <CardContentItem>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      width: '75%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {name}
                  </Typography>
                </CardContentItem>
              </CardItem>
            </Link>
            <BoxButtons className="btn">
              <BoxButton>
                <RenameFolder folderId={id} />
              </BoxButton>
              <BoxButton>
                <DeleteFolder folderId={id} />
              </BoxButton>
            </BoxButtons>
          </BoxItem>
        )
      })}
    </List>
  )
}

export default FolderList
