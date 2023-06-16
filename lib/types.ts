import { type Message } from 'ai-connector'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
}

export interface Share {
  id: string
  title: string
  createdAt: number
  userId: string
  path: string
  chat: Chat
}

export type ServerActionResult<Result> = Promise<Result | Error>
