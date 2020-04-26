# 202012717_KJH

202012717 김준하

프로젝트 내용
음악에 대한 간단한 정보를 저장할 수 있는 통신규약입니다.
Postman 프로그램을 사용한다는 기준 하에 만들어졌습니다.

요청 목록

URL|METHOD|설명|요청 메시지 규격|기타
/musics|GET|음악 목록 보기||
/musics/id|GET|음악 상세 보기|id는 musicId, 필수값|
/musics|POST|음악 정보 추가||content-type:x-www-form-urlencoded
/musics/id|PUT|음악 정보 수정|id는 musicId, 필수값|content-type:x-www-form-urlencoded
/musics/id|DELETE|음악 정보 제거|id는 musicId, 필수값|

상세내용 별도 엑셀파일 참고