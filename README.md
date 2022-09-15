#

## 1️⃣ 프로젝트 설명⚡️

<pre>
프리온보딩 3번째 과제

- jwt를 이용해 회원을 인증하고 roleGuard를 통해 일반 이용자와 관리자를 구분하였습니다.
- 관리자는 상품 데이터와 주문 내역 데이터들을 관리 할 수 있도록 하였습니다.
- 일반 사용자는 상품의 조회와 본인의 주문 내역들을 관리를 제외하고 사용할 수 없도록 하였습니다.
</pre>

</br>

## 2️⃣ 프로젝트 요약🌈

- 기간 : 2022.09.09 ~ 2022.09.15
- 개발 언어 : Javascript
- 개발 라이브러리 : NestJs
- DB : MySQL

</br>

## 3️⃣ ERD✨

</br></br>
![](https://velog.velcdn.com/images/jhlee123/post/dc80e7dc-9135-474e-b6dc-2bf6cf07cd69/image.png)
</br>

## 4️⃣ API 명세✨

![](https://velog.velcdn.com/images/jhlee123/post/3b264dcf-b53b-426f-93fe-aaec5446738b/image.png)
![](https://velog.velcdn.com/images/jhlee123/post/0e487e43-bec9-42e0-a47a-1e376f698d65/image.png)
![](https://velog.velcdn.com/images/jhlee123/post/d2ba0526-ae4d-4e16-b1e5-db9b17d030f2/image.png)
![](https://velog.velcdn.com/images/jhlee123/post/bb820bb6-d81f-4d3f-8e0c-af71a756f972/image.png)
</br></br>

## 5️⃣ 요구사항 분석🌟

1. 유저
   - 권한
     - 이용자 및 관리자 구분
     - 이용자는 회원가입, 결재 주문을 제외하고 조회 권한만 존재
     - 상품, 결재, 주문은 관리자만 등록, 수정, 삭제 가능
   - 회원가입
     - 필요한 데이터는 이름, 닉네임, 이메일, 비밀번호
     - 관리자는 다른 관리자가 승인하는 방식으로 사용
     - 비밀번호는 bycript를 사용해 암호화
     - 비밀번호는 숫자, 영어, 특수문자 포함 10자 이상 15자 미만
   - 로그인
     - jwt를 사용하여 본인인증 및 로그인
     - roleguard를 통해 api에 따라 권한 부여
2. 상품
   - 상품 관리
     - 작성, 수정, 삭제를 관리자만 접근 가능하도록 권한 설정 필요
     - 조회 api는 비로그인 사용자도 가능하도록 구현
   - 상품 전체 페이지 조회
     - 상품 정보 중 pk, 이름, 가격, 할인 정보, 매진 정보, 메인 이미지만 출력
     - 상품이 존재하지 않을 시 빈 배열 출력
   - 상품 등록
     - 이름, 가격, 할인 정보, 배송비, 배송 날짜, 원산지, 메인 이미지, 상품 설명 이미지 필요
   - 상품 상세 페이지 조회
     - 필요한 데이터는 상품의 pk
     - 상품이 존재하지 않을 경우 NotFoundException
   - 상품 수정 기능
     - 필요한 데이터는 상품의 pk 및 수정할 정보
     - PUT 메서드를 사용해 데이터 수정
     - 상품이 존재하지 않을 경우 NotFoundException
     - 관리자가 아닌 경우 UnauthorizedException
   - 상품 삭제 기능
     - 필요한 데이터는 상품의 pk
     - 상품이 존재하지 않을 경우 NotFoundException
     - 관리자가 아닌 경우 UnauthorizedException
3. 주문 내역
   - 주문 내역 등록
     - 작성, 수정, 삭제를 관리자만 접근 가능하도록 권한 설정 필요
     - 조회 api는 비로그인 사용자도 가능하도록 구현
   - 주문 내역 전체 조회
     - 일반 사용자
       - jwt 토큰을 통해 본인의 주문 내역만 조회하도록 구현
     - 관리자
       - 모든 주문 내역을 조회 가능하도록 구현
   - 주문 내역 조회
     - 일반 사용자
       - jwt 토큰을 통해 본인의 주문 내역이 아닐 경우 조회 불가하도록 구현
       - 본인 주문 내역이 아닌 경우 예외처리
     - 관리자
       - 모든 주문 내역을 조회 가능하도록 구현
   - 주문 내역 취소 - 일반 사용자 - jwt 토큰을 통해 본인의 주문만 취소할 수 있도록 구현 - 본인 주문 내역이 아닌 경우 예외처리 - 관리자 - 모든 주문 내역을 취소 가능하도록 구현
     </br>

## 6️⃣ 트러블 슈팅🚀

</br>

## 7️⃣ 사용한 라이브러리(패키지)

| 라이브러리명    | 내용              | 참고                |
| :-------------- | :---------------- | :------------------ |
| jwt             | access token 발행 |                     |
| passport        | token 유효성 검사 |                     |
| typeorm         | ORM               | 데이터베이스와 연결 |
| class-validator | 유효성 체크       |                     |
| bycript         | 비밀번호 암호화   |                     |
| swagger         | API 문서화        |                     |
