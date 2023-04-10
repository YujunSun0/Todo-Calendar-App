# Todo-Calendar-App

간단한 투두앱입니다.

배포 링크: <a href="http://YujunSun0.github.io/Todo-Calendar-App/" target="_blank">깃허브 배포 링크</a>

화면은 모바일 전용으로 만들었으며 현재는 (470x677)을 기준으로 제작하였습니다. (추후 반응형 코드 추가 예정)

<br />

**초기 구현화면 ( 업데이트 되면 아래에 기능 설명과 함께 구현화면 추가예정 )**

https://user-images.githubusercontent.com/120611048/230699930-d5d631ef-cd85-4440-adcc-008c0638eada.mov

## ✅ 현재까지 구현한 기능 (4/8)

- Create / Read / Update / Delete

**메인 페이지**

- 주 단위의 캘린더가 있어 각 날짜마다 일정의 수가 표시되어 있으며, 클릭하면 일정을 볼 수 있습니다.
- 할 일을 내일로 미룰 수 있다.

**캘린더 페이지**

- 월 단위의 캘린더가 있어 일정을 간단하게 볼 수 있다. 일정의 글자수가 6이 넘으면 애니메이션 효과를 주어 읽을 수 있게 했습니다.

## ✅ 필터링 기능추가 (4/9)

### 첫 번째 수정

처음에는 완료한 일정의 필터링을 목적으로 두 상태를 구분만 지었습니다.

<img width="492" alt="스크린샷 2023-04-10 오전 12 03 29" src="https://user-images.githubusercontent.com/120611048/230780528-e57e6db3-95f9-49af-b393-78310f44c729.png">

### 두 번째 수정

메인 캘린더에는 원래 해당하는 날짜의 일정의 수를 표시했었지만, 이를 남은 일정의 수로 변경하고 일정을 모두 완료했다면 체크표시를 해주었습니다.  
![ezgif com-video-to-gif (18)](https://user-images.githubusercontent.com/120611048/230783838-ac075e9d-4ed3-422d-8efd-214929c28109.gif)
