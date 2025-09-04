//src/api/mock/data.ts
export type Post = {
  id: string; title: string; body: string; author: string;
  createdAt: string; views: number; likes: number; commentsCount: number;
};
export type Comment = {
  id: string; postId: string; body: string; author: string; createdAt: string;
};

const now = () => new Date().toISOString();
const rid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

export const MOCK = {
  posts: [
    { id: 'p1', title: '심심할 때 만나서 같이 노실 분~~~🐥', body: '동네친구처럼 카페/보드게임/야구장 등 같이 놀아요!', author: '율이', createdAt: now(), views: 224, likes: 2, commentsCount: 1 },
    { id: 'p2', title: '성인 영어회화 배워본 적 있으신분 계실까요ㅎㅎ', body: '40대지만 버킷리스트라 꼭 도전!', author: '두암1동', createdAt: now(), views: 19, likes: 0, commentsCount: 0 }
  ] as Post[],
  comments: [
    { id: rid(), postId: 'p1', body: '저도 보드게임 좋아해요!', author: '익명', createdAt: now() }
  ] as Comment[]
};
