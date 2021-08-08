## Description

2021글림미디어 개발자 과제 서버

## Installation

```bash
git clone [fork한 repository 주소]
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
Listening on Port 5000, localhost

## Stacks

NestJS, TypeORM, SQLite

## features

- 조회 GET/todos
- 검색 GET/todos?search=query
- 추가 POST/todos
- 삭제 DELETE/todos/:id
- 수정 PATCH/todos/:id
- 상태 변경 PATCH/todos/:id/status

