import styled from '@emotion/styled'
import { Card, CardContent } from '@mui/material'
import { Box } from '@mui/system'

export const BoxItem = styled(Box)({
  position: 'relative',
  '&:hover .btn': { display: 'flex' },
})

export const CardItem = styled(Card)({
  marginBottom: '5px',
  transition: 'background-color ease-in-out 200ms',
  '&:hover': { bgcolor: '#dddddd' },
})

export const CardContentItem = styled(CardContent)({
  '&:last-child': { paddingBottom: '10px' },
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const BoxButtons = styled(Box)({
  height: '100%',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0',
  position: 'absolute',
  top: 0,
  right: 0,
})

export const BoxButton = styled(Box)({
  padding: '0 4px',
})
