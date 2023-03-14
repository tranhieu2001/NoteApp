import { graphQLRequest } from './request'

//  ----------------------------- LOADER -----------------------------
export const foldersLoader = async () => {
  const query = `query Folders {
    folders {
      id
      name
      createdAt
    }
  }`

  const data = await graphQLRequest({ query })
  return data
}

//  ----------------------------- ACTIONS -----------------------------
export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`

  const data = await graphQLRequest({
    query,
    variables: { name: newFolder.name },
  })
  return data
}

export const deleteFolder = async (folderId) => {
  const query = `mutation Mutation($folderId: String!) {
    deleteFolder(folderId: $folderId) {
      message
    }
  }`

  const data = await graphQLRequest({
    query,
    variables: { folderId },
  })
  return data
}

export const renameFolder = async ({ folderId, folderName }) => {
  const query = `mutation RenameFolder($folderId: String!, $name: String!) {
    renameFolder(folderId: $folderId, name: $name) {
      message
    }
  }`

  const data = await graphQLRequest({
    query,
    variables: { folderId, name: folderName },
  })
  return data
}
