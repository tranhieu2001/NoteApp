import { createBrowserRouter, Outlet } from 'react-router-dom'

import NoteList from '../components/notes/NoteList'
import Note from '../components/notes/Note'
import AuthProvider from '../context/AuthProvider'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ProtectedRoute from './ProtectedRoute'
import {
  addNewNote,
  noteLoader,
  notesLoader,
  updateNote,
} from '../utils/noteUtils'
import { foldersLoader } from '../utils/foldersUtils'

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

// Outlet render một trong những element thuộc children nếu match với path của nó
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: '/login',
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: '/',
            loader: foldersLoader,
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
                loader: notesLoader,
                action: addNewNote,
                children: [
                  {
                    element: <Note />,
                    loader: noteLoader,
                    action: updateNote,
                    path: `note/:noteId`,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
])
