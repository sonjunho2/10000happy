//src/api/endpoints.ts
import { client } from './client';
import { MOCK, Post, Comment } from './mock/data';

export type { Post, Comment };

const rid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

export async function listPosts(): Promise<Post[]> {
  try {
    const data = await client.get<Post[]>('/posts');
    return data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  } catch {
    const posts = MOCK.posts.map(p => ({
      ...p,
      commentsCount: MOCK.comments.filter(c => c.postId === p.id).length
    }));
    return posts.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }
}

export async function getPost(id: string): Promise<{ post: Post; comments: Comment[] }> {
  try {
    const post = await client.get<Post>(`/posts/${id}`);
    const comments = await client.get<Comment[]>(`/posts/${id}/comments`);
    return { post, comments };
  } catch {
    const post = MOCK.posts.find(p => p.id === id)!;
    const comments = MOCK.comments.filter(c => c.postId === id).sort((a,b)=>+new Date(b.createdAt)-+new Date(a.createdAt));
    return { post, comments };
  }
}

export async function createPost(input: { title: string; body: string; author: string }): Promise<Post> {
  try {
    return await client.post<Post>('/posts', input);
  } catch {
    const p: Post = { id: rid(), title: input.title, body: input.body, author: input.author, createdAt: new Date().toISOString(), views: 0, likes: 0, commentsCount: 0 };
    MOCK.posts.unshift(p);
    return p;
  }
}

export async function addComment(postId: string, input: { body: string; author: string }): Promise<Comment> {
  try {
    return await client.post<Comment>(`/posts/${postId}/comments`, input);
  } catch {
    const c: Comment = { id: rid(), postId, body: input.body, author: input.author, createdAt: new Date().toISOString() };
    MOCK.comments.unshift(c);
    const idx = MOCK.posts.findIndex(p => p.id === postId);
    if (idx >= 0) MOCK.posts[idx].commentsCount += 1;
    return c;
  }
}

export async function likePost(postId: string): Promise<Post> {
  try {
    return await client.post<Post>(`/posts/${postId}/like`, {});
  } catch {
    const p = MOCK.posts.find(x => x.id === postId)!;
    p.likes += 1;
    return { ...p };
  }
}
