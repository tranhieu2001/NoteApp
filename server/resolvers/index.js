import { GraphQLScalarType } from 'graphql'
import { PubSub } from 'graphql-subscriptions'

import AuthorModel from '../models/AuthorModel.js'
import FolderModel from '../models/FolderModel.js'
import NoteModel from '../models/NoteModel.js'
import NotificationModel from '../models/NotificationModel.js'

const pubsub = new PubSub()

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value)
    },
    serialize(value) {
      return value.toISOString()
    },
  }),

  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: 'desc',
      })
      return folders
    },
    folder: async (parent, args) => {
      const folderId = args.folderId
      const foundFolder = await FolderModel.findById(folderId)
      return foundFolder
    },
    note: async (parent, args) => {
      const noteId = args.noteId
      const note = await NoteModel.findById(noteId)
      return note
    },
  },
  Folder: {
    author: async (parent) => {
      const authorId = parent.authorId
      const author = await AuthorModel.findOne({
        uid: authorId,
      })
      return author
    },
    notes: async (parent) => {
      const folderId = parent.id
      const notes = await NoteModel.find({
        folderId,
      }).sort({
        updatedAt: 'desc',
      })
      return notes
    },
  },
  Mutation: {
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid })

      if (!foundUser) {
        const newUser = new AuthorModel(args)
        await newUser.save()
        return newUser
      }
      return foundUser
    },
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid })
      pubsub.publish('FOLDER_CREATED', {
        folderCreated: {
          message: 'A new folder created',
        },
      })
      await newFolder.save()
      return newFolder
    },
    addNote: async (parent, args) => {
      const newNote = new NoteModel(args)
      await newNote.save()
      return newNote
    },
    updateNote: async (parent, args) => {
      const noteId = args.id
      const note = await NoteModel.findByIdAndUpdate(noteId, args)
      return note
    },
    pushNotification: async (parent, args) => {
      const newNotification = await NotificationModel(args)
      pubsub.publish('PUSH_NOTIFICATION', {
        notification: {
          message: args.content,
        },
      })
      await newNotification.save()
      return { message: 'SUCCESS' }
    },
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED']),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION']),
    },
  },
}
