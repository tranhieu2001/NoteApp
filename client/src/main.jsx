import { Container } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { RouterProvider } from 'react-router-dom'

import './firebase/config'
import './index.css'
import router from './router'

// Import font
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Container maxWidth="lg" sx={{ textAlign: 'center', marginTop: '50px' }}>
    <RouterProvider router={router} />
  </Container>
)
