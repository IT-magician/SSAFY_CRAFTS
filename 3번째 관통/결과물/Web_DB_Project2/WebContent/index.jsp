<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="root" value="${pageContext.request.contextPath}"></c:set>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Document</title>
<link rel="stylesheet" href="./css/main.css" type="text/css" />



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

</head>
<body>

	<!-- index경로로 열라면 내 카카오 api key값을 맞추고 카카오 api web경로를 설정해줘야 키가먹음 -->
	<script type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=3dc1d30bd83040ce1fe426e23ef1f0b8&libraries=services"></script>
	<script defer src="${root}/js/main.js"></script>
	
	
	<c:if test="${!empty login }">
		<%@include file="/include/userFavor.html" %>
		<script src="${root}/js/userFavor.js"></script>
		<link rel="stylesheet" href="${root}/css/userFavor.css">
	</c:if>




	<!-- 로그인 실패 모달 -->

	<c:if test="${!empty loginVal }">
		<div class="login-false-container">
		<form id="form-login-false" method="get" action="user"
			class="login-false-form">
			<input type="hidden" name="action" value="loginFalse">
			<div class="login-false">
				<p class="login-false-p">아이디나 비밀번호를 확인하세요!</p>
				<button type="submit" class="loginFalseBtn">확인</button>
			</div>
		</form>
		</div>
	</c:if>

	<div class="login_modal">
		<div class="login_modal_right">
			<button class="login_modal_deleteBtn">X</button>
		</div>


		<!-- 로그인 모달 -->
		<form id="form-login" method="get" action="user"
			class="form_container">
			<input type="hidden" name="action" value="login">
			<div class="login_form">
				<label for="userid" class="form_label">아이디</label> <input
					type="text" class="form_control InputId" id="userid2"
					placeholder="아이디..." name="userid2" value="${svid}" /> <label
					for="userpwd" class="form_label">비밀번호</label> <input
					type="password" class="form_control InputPwd" id="userpwd2"
					placeholder="비밀번호..." name="userpwd2" />

				<button type="submit" id="btn-login" class="login_btn loginBTN">로그인</button>
			
			</div>
		</form>
	</div>

	<div class="signUp">
		<div class="login_modal_right">
			<button class="signUp_modal_deleteBtn">X</button>
		</div>

		<!-- 회원가입 모달 -->
		<form id="form-join" method="get" action="user" class="form_container">
			<input type="hidden" name="action" value="insertmember">
			<div class="login_form">
				<label for="userid" class="form_label">아이디</label> <input
					type="text" class="form_control signUpID" id="userid" name="userid"
					placeholder="아이디..." /> <label for="userpwd"
					class="form_label">비밀번호</label> <input type="password"
					class="form_control signUpPw" id="userpwd" name="userpwd"
					placeholder="비밀번호..." /> <label for="username"
					class="form_label">이름</label> <input type="text"
					class="form_control signUpName" id="username" name="username"
					placeholder="이름..." /> <label for="userAdr"
					class="form_label">주소</label> <input type="text"
					class="form_control signUpAdr" id="userAdr" name="userAdr"
					placeholder="주소..." />
				<button type="button" id="btn-join"
					class="login_btn loginBTN signUPBTN">회원가입</button>
			</div>
		</form>
	</div>

	<header>
		<nav class="header_nav">
			<div class="header_nav_right">
				<!-- 아이콘 어떻게 할건지 -->
				<c:if test="${empty login }">
					<button class="header_nav_Btns header_login_btn">Login</button>
					<button class="header_nav_Btns header_signUp_btn">Sign Up</button>
				</c:if>
				<c:if test="${!empty login }">
					<form id="form-join" method="get" action="user"
						class="form_container">
						<label for="opener" style="color:#fff;cursor:pointer;margin:5px"">${login }</label>님 환영합니다.
						<input type="hidden" name="action" value="logout">
						<button class="header_nav_Btns">LogOut</button>
					</form>
				</c:if>
			</div>
		</nav>
		<div class="header_main">
			<div class="header_main_Container">
				<a href="index.html"> <img src="./img/logo.jpg" alt="logo"
					class="logo_img" />
				</a>
				<div class="header_main_right">
					<p class="header_main_name">공지사항</p>
					<p class="header_main_name">오늘의 뉴스</p>
				</div>
			</div>
		</div>
	</header>

	<main class="main">
	<div class="main_bg">
		<img src="./img/download-bg.jpg" alt="background"
			class="imgBackground" />
		<div class="main_title_container">
			<p class="main_title">구해줘 HOME!!!</p>
			<p class="main_Line"></p>
			<p class="main_name">우리를 위한 집</p>
			
		</div>
	</div>
	</main>

	<div class="main_input">
		<div class="main_input_container">
			<select class="sido sidoBtns" id="sido">
				<option value="">시도선택</option>
			</select> <select class="sidoBtns" id="gugun">
				<option value="">구군선택</option>
			</select> <select class="sidoBtns" id="dong">
				<option value="">동선택</option>
			</select>

			<button type="button" id="list-btn" class="sidoBtn">
				아파트매매정보가져오기</button>
		</div>
		
	</div>
	<div class="mapContainer2">
		<div class="login_modal_right">
			<button class="signUp_modal_deleteBtn mapDeleteBtn">X</button>
		</div>
		<div id="map" class="mapContainerBox"></div>
		<table class="apartment-table">
			<tr>
				<th>아파트이름</th>
				<th>층</th>
				<th>면적</th>
				<th>법정동</th>
				<th>거래금액</th>
			</tr>
			<tbody id="aptlist"></tbody>
		</table>
	</div>

	<div class="main_content_container">
		<div class="main_content">
			<img src="img/houseAD.jpg" alt="house" class="houseImg" />
			<div class="main_content_tag">
				<h1 class="main_content_title">지혜롭게 내집 마련하기</h1>
				<div class="line"></div>
				<div class="aBox">
					<a>가용자금 확인 및 대출 계획</a> <a>집 종류 및 지역 선택</a> <a>정보 수집 & 시세 파악</a> <a>부동산
						방문 & 집 구경</a> <a>계약 및 잔금 치트키</a> <a>인테리어 공사</a>
				</div>
			</div>
		</div>
	</div>

	<footer>
		<div class="footer_container">
			<img class="footer_logo" alt="logo" src="./img/logo2.png" />
			<div class="footer_main">
				<p class="footer_name">Find Us</p>
				<div class="line" />
				<p class="footer_name2">(SSAFY)서울시 강남구 테헤란로 멀티스퀘어</p>
				<p>1544-9001</p>
				<p>admin@ssafy.com</p>
			</div>
		</div>
	</footer>

	<script>
		document.querySelector("#btn-join").addEventListener("click", function() {
			if(!document.querySelector("#userid").value) {
				alert("아이디 입력하세요.");
				return;
			} else if(!document.querySelector("#userpwd").value) {
				alert("비밀번호 입력하세요.");
				return;
			} else if(!document.querySelector("#username").value) {
				alert("이름 입력하세요.");
				return;
			} else if(!document.querySelector("#userAdr").value) {
				alert("비밀번호 입력하세요.");
				return;
			} else {
				let form = document.querySelector("#form-join");
				form.setAttribute("action", "./login.user");
				form.submit();
			}
		});
	</script>


</body>
</html>