import { graphQLRequest } from './request'

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folders($folderId: String!) {
    folder(folderId: $folderId) {
      id
      name
      notes {
        id
        content
        updatedAt
      }
    }
  }`

  const data = await graphQLRequest({ query, variables: { folderId } })
  return data
}

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Folder($noteId: String) {
    note(noteId: $noteId) {
      content
      id
    }
  }`

  const data = await graphQLRequest({ query, variables: { noteId } })
  return data
}

export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData()
  const formDataObj = {}

  newNote.forEach((value, key) => {
    formDataObj[key] = value
  })

  const query = `mutation AddNote($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      content
      id
    }
  }`

  const data = await graphQLRequest({ query, variables: formDataObj })
  return data
}

export const updateNote = async ({ params, request }) => {
  const updatedNote = await request.formData()
  const formDataObj = {}

  updatedNote.forEach((value, key) => {
    formDataObj[key] = value
  })

  const query = `mutation UpdateNote($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      content
      id
    }
  }`

  const data = await graphQLRequest({ query, variables: formDataObj })
  return data
}
