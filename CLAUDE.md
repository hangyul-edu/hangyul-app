# Expo 프로젝트 가이드 (Project Guide)

이 프로젝트는 Expo와 React Native를 사용하여 개발되는 모바일 애플리케이션입니다.

## 🛠 기술 스택 (Tech Stack)
- **Framework:** Expo (Managed Workflow)
- **Language:** TypeScript
- **Navigation:** Expo Router (File-based routing)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Icons:** Lucide-react-native

## 📚 공식 문서 참조 (LLM Context)
Claude는 답변 시 아래의 최신 공식 문서 번들을 우선적으로 참고합니다:
- **전체 가이드:** https://documentation.expo.dev/llms-full.txt
- **SDK 참조:** https://documentation.expo.dev/llms-sdk.txt

## 🚀 주요 명령어 (Commands)
- **개발 서버 시작:** `npx expo start`
- **iOS 실행:** `npx expo run:ios`
- **안드로이드 실행:** `npx expo run:android`
- **의존성 설치:** `npx expo install <package>`
- **Lint 체크:** `npm run lint`

## 📝 코딩 규칙 (Coding Standards)
- **컴포넌트:** 함수형 컴포넌트와 Hooks(`useState`, `useEffect` 등)를 사용합니다.
- **파일 구조:** `app/` 폴더 내에 Expo Router 기반의 페이지를 구성하고, `components/` 폴더에 재사용 가능한 컴포넌트를 관리합니다.
- **타입 정의:** 모든 Props와 데이터 모델에는 TypeScript interface/type을 정의합니다.
- **스타일링:** 가급적 유틸리티 클래스(NativeWind)를 사용하되, 복잡한 로직은 별도의 객체로 분리합니다.