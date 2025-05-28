// src/mocks/handlers.js
import { http, HttpResponse, delay } from 'msw';

// 한글-safe Base64 인코딩/디코딩
const toBase64 = (obj) =>
  window.btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
const fromBase64 = (str) =>
  JSON.parse(decodeURIComponent(escape(window.atob(str))));

// 가짜 JWT 생성 함수
const createFakeToken = (user) => {
  const header = toBase64({ alg: 'HS256', typ: 'JWT' });
  const payload = toBase64(user);
  const signature = 'mocksignature';
  return `${header}.${payload}.${signature}`;
};

// 랜덤 지연 시간 (1초 ~ 6초)
const getRandomDelay = () => Math.floor(Math.random() * 5000) + 1000;

// 메모리 채팅 로그 (GET 테스트용)
let chatMessages = [
  { id: 1, sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
];

export const handlers = [
  // ✅ 로그인 핸들러 (/auth/login)
  http.post('/api/auth/login', async ({ request }) => {
    const { user_id, user_password } = await request.json();

    if (user_id === 'test' && user_password === '1234') {
      const user = { id: 1, user_name: '라이언', role: 'user' };
      const token = createFakeToken(user);

      return HttpResponse.json({
        message: '로그인 성공',
        token,
      });
    }

    return new HttpResponse('아이디 또는 비밀번호가 틀렸습니다', { status: 401 });
  }),

  // ✅ 채팅 핸들러 (POST /chat, 인증 필요 + 랜덤 딜레이 추가)
  http.post('/api/chat', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return new HttpResponse('Unauthorized', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const [, payload] = token.split('.');

    try {
      const user = fromBase64(payload);
      const { message } = await request.json();

      console.log(`[채팅 요청] 사용자: ${user.name}, 메시지: ${message}`);

      const delayTime = getRandomDelay();
      console.log(`[MOCK] 응답 지연 시간: ${delayTime}ms`);
      await delay(delayTime);

      return HttpResponse.json({ message: '감사합니다' });
    } catch {
      return new HttpResponse('Invalid token', { status: 403 });
    }
  }),

  // ✅ chat 목록 GET (테스트용)
  http.get('/api/chat', () => {
    return HttpResponse.json(chatMessages);
  }),

  // ✅ 페이지 새로고침 시 경고 방지용 dummy 핸들러
  http.get('/', () => HttpResponse.text('')),
  http.get('/auth/login', () => HttpResponse.text('')),
  http.get('/auth/register', () => HttpResponse.text('')),
];