import { client } from './client';
import { USE_MOCK } from '../config/env';
import * as mock from './mock/data';

export type User = { id: string; nickname: string; point: number; avatar?: string };
export type Dream = { id: string; title: string; current: number; goal: number };
export type ChatSummary = { id: string; name: string; lastMessage: string; unread: number };
export type Message = { id: string; author: 'me'|'other'; text: string; at: string };

export async function fetchUser(): Promise<User> {
  if (USE_MOCK) return mock.user;
  const { data } = await client.get('/user/me');
  return data;
}

export async function fetchDreams(): Promise<Dream[]> {
  if (USE_MOCK) return mock.dreams;
  const { data } = await client.get('/dreams');
  return data;
}

export async function fetchChats(): Promise<ChatSummary[]> {
  if (USE_MOCK) return mock.chats;
  const { data } = await client.get('/chats');
  return data;
}

export async function fetchMessages(chatId: string): Promise<Message[]> {
  if (USE_MOCK) return mock.messages[chatId] ?? [];
  const { data } = await client.get(`/chats/${chatId}/messages`);
  return data;
}

export async function sendMessage(chatId: string, text: string): Promise<Message> {
  if (USE_MOCK) {
    const m = { id: String(Date.now()), author: 'me' as const, text, at: new Date().toISOString() };
    return m;
  }
  const { data } = await client.post(`/chats/${chatId}/messages`, { text });
  return data;
}
