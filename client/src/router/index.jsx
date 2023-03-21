import { createBrowserRouter, Outlet } from 'react-router-dom'

import Note from '../components/notes/Note'
import NoteList from '../components/notes/NoteList'
import AuthProvider from '../context/AuthProvider'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { foldersLoader } from '../utils/foldersUtils'
import {
  addNewNote,
  noteLoader,
  notesLoader,
  updateNote,
} from '../utils/noteUtils'
import ProtectedRoute from './ProtectedRoute'

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
