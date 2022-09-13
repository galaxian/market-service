#

## 1️⃣ 프로젝트 설명⚡️

<pre>
프리온보딩 3번째 과제
</pre>

</br>

## 2️⃣ 프로젝트 요약🌈

- 기간 : 2022.09.09 ~ 2022.09.14
- 개발 언어 : Javascript
- 개발 라이브러리 : NestJs
- DB : MySQL

</br>

## 3️⃣ ERD✨

</br></br>

</br>

## 4️⃣ API 명세✨

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
     - 비밀번호는 숫자, 영어, 특수문자 포함 8자 이상 15자 미만
   - 로그인
     - jwt를 사용하여 본인인증 및 로그인
     - guard를 통해 권한 부여
2. 상품
   - 상품 관리
     - 작성, 수정, 삭제를 관리자만 접근 가능하도록 권한 설정 필요
   - 상품 전체 페이지 조회
     - 사용자 편의성 및 서버 부하 방지를 위해 pagination 적용
     - 이미지 압축을 통한 로딩 시간 감소 적용
     - 상품 정보 중 이름, 가격, 할인 정보, 매진 정보, 구매평가 숫자만 출력
     - 상품이 존재하지 않을 시 빈 배열 출력
   - 상품 등록
     - 이름, 가격, 할인 정보, 배송비, 배송 날짜, 원산지, 배송 방법 필요
     - 상세 정보는 이미지로 사용
     - 구매평가
     - 상품이 존재하지 않을 경우 NotFoundException
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
   - 유저가 어떤 상품을 구매했는지를 확인하는 기능으로 생각
   - 유저 및 상품 테이블의 다대일 관계로 설정
   - 사용자가 어떤 상품들을 주문했는지 확인 가능
   - 어떤 상품이 사용자들에게 주문되었는지 확인 가능
   - 주문 내역 등록
     - 필요한 데이터는 배송 상태, 결재 유무, 배송 완료 날짜, 배송지역 주소, 우편번호, 연락처, 배송시 요구사항
   - 주문 내역 삭제
     - 주문자 본인 또는 관리자만 삭제 가능
     - 삭제 시 결제 테이블도 변경되도록 변경
   - 주문 내역 수정
     - 이용자는 배송 시작 전까지 주소, 우편번호, 연락처 등 수정 가능
     - 관리자는 배송 상태, 배송 완료 날짜 등 수정 가능
4. 결재 관리
   - 주문 내역 테이블과 일대일 관계
   - 결재 등록
     - 필요한 데이터는 상품, 수량, 결재 가격
   - 결재 처리 및 취소
     - put 메서드를 사용하여 결재 상태 완료, 취소를 표시하는 방식으로 변경하도록 구현
   - 결재 필터링
     - 결재 유무를 및 일정 기간을 필터링 할 수 있도록 구현

</br>

## 6️⃣ 트러블 슈팅🚀

</br>

## 7️⃣ 사용한 라이브러리(패키지)