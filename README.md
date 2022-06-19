# 확장자 서비스 Frontend(Extension)

- 확장자 최대 길이는 20자이며, 일반적으로 사용되는 확장자를 위해서 특수문자는 제외하고 영문자와 숫자만을 허용합니다.
- 커스텀 확장자는 최대 200개까지 저장할 수 있습니다.
- 등록 시에는 확장자 중복 체크 및 커스텀 확장자일 경우 200개 제한을 초과하는지 체크 후 등록합니다.
- 수정 기능은 used(체크 여부) 만을 수정할 수 있습니다.
- 목록 조회 시에는 타입 별로 해당되는 타입의 목록을 가져옵니다.

### Requirements
- Node.js >= v16

### Node.js 다운로드
[https://nodejs.org/ko/](https://nodejs.org/ko/)

### 빌드
### `npm run build`

### 설치
### `npm install`

### 서버 실행
### `npm start`
9432번 포트로 앱이 실행됩니다.
브라우저에서 [http://localhost:9432](http://localhost:9432)으로 들어가 확인하십시오.
백엔드는 [http://localhost:8080](http://localhost:8080)으로 실행되어 있어야 합니다.
