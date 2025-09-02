# AIDER (Kakao-Style) — Expo React Native

카카오톡 친숙한 UI로 구성된 AIDER 더미 앱입니다. `USE_MOCK=true`로 기본 동작하며,
관리 서버 주소만 넣으면 실제 API로 전환할 수 있습니다.

## 빠른 시작
```bash
npm i -g expo-cli
npm install
npm run start
# 또는 안드로이드 에뮬/기기에서
npm run android
```

## 관리서버 연결
- `src/config/env.ts`에서 `BASE_URL`을 실제 서버 API 주소로 변경
- `USE_MOCK`을 `false`로 바꾸면 관리자 서버로 요청합니다.
- 예상 API (참고):
  - `GET /user/me` → 사용자 정보({ id, nickname, point })
  - `GET /dreams` → 꿈 리스트
  - `GET /chats` → 채팅방 리스트
  - `GET /chats/:id/messages` → 메시지 리스트
  - `POST /chats/:id/messages` { text } → 메시지 전송

## 빌드 (APK)
- Expo EAS 사용 권장
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

## 폴더 구조
- `src/screens` : 각 화면
- `src/components` : UI 컴포넌트
- `src/api` : API 클라이언트 및 mock
- `src/theme` : 색상/스타일
- `src/navigation` : 탭/스택 네비게이션
