#project-overview (프로젝트 개요)
모바일 웹 청첩장을 만드는 프로젝트입니다.
모바일 환경에 최적화 된 웹 사이트입니다.

#feature-requirements (기능 요구사항)
https://w.theirmood.com/card/IQDThUphtU

사이트 참조
메인 화면
초대 화면
날짜 화면
갤러리 화면
오시는 길 화면
연락처 & 계좌번호 화면
메인 화면처럼 footer 느낌의 이미지

한글 폰트는 가비아고스란
영어 폰트는 Cinzel SemiBold

#Current-file-instruction (현재 파일 구조)

wedding-invitation/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   └── fonts/
│   │       ├── GabiaGosran.otf
│   │       └── GabiaGosran.ttf
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── ContactSection.js
│   │   ├── DateSection.js
│   │   ├── GallerySection.js
│   │   ├── InvitationSection.js
│   │   ├── Loading.js
│   │   ├── LocationSection.js
│   │   └── MainSection.js
│   │
│   ├── public/
│   │   └── images/
│   │
│   ├── styles/
│   │   └── GlobalStyle.js
│   │
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── Requirements.md

1. Section.js: 모든 섹션의 기본 레이아웃을 정의하는 공통 컴포넌트
2. MainSection.js: 웨딩 초대장의 메인 화면
3. InvitationSection.js: 초대의 글과 인사말
4. DateSection.js: 결혼식 날짜, 시간, D-day 카운터
5. GallerySection.js: 웨딩 사진 슬라이드 갤러리
6. LocationSection.js: 오시는 길 지도와 정보
7. ContactSection.js: 연락처와 계좌번호 정보
8. Loading.js: 초기 로딩 화면
