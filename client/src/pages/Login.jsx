import { Button, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { graphQLRequest } from '../utils/request'

function Login() {
  const auth = getAuth()

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider)

    const { data } = await graphQLRequest({
      query: `mutation Mutation($uid: String!, $name: String!) {
        register(uid: $uid, name: $name) {
          name
          uid
        }
      }`,
      variables: {
        uid,
        name: displayName,
      },
    })
    console.log('register', { data })
  }

  if (localStorage.getItem('accessToken')) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: '10px' }}>
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  )
}

export default Login
