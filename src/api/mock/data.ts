import { User, Dream, ChatSummary, Message } from '../endpoints';

export const user: User = {
  id: 'u1',
  nickname: 'sonoo2',
  point: 13240000,
  avatar: undefined,
};

export const dreams: Dream[] = [
  { id: 'd1', title: '가족과 제주도 여행가고 싶어요', current: 10000, goal: 78100000 },
  { id: 'd2', title: '나만의 공방을 열고 싶어요', current: 20000, goal: 78100000 },
];

export const chats: ChatSummary[] = [
  { id: 'c1', name: '운영팀 공지', lastMessage: '환영합니다. 1만원으로 시작해요!', unread: 2 },
  { id: 'c2', name: '나의 추천인', lastMessage: '이번 주 진행상황 공유합니다', unread: 0 },
  { id: 'c3', name: '지원/문의', lastMessage: '무엇을 도와드릴까요?', unread: 3 },
];

export const messages: Record<string, Message[]> = {
  c1: [
    { id: 'm1', author: 'other', text: '환영합니다 👋', at: new Date().toISOString() },
    { id: 'm2', author: 'other', text: '1만원으로 시작하는 꿈의 여정!', at: new Date().toISOString() },
  ],
  c2: [
    { id: 'm3', author: 'other', text: '이번 주엔 3명이 등록했습니다.', at: new Date().toISOString() },
  ],
  c3: [
    { id: 'm4', author: 'me', text: '도움이 필요합니다.', at: new Date().toISOString() },
    { id: 'm5', author: 'other', text: '무엇이 궁금하신가요?', at: new Date().toISOString() },
  ],
};
