export default {
    template: `
  <div>
  
  
  <div class="content" v-if="!isAccountInfoMode">
      <div class="input">
          <input type="search" v-model="userID" id="userID" :placeholder="isLoginMode?'ID':'가입할 ID'"
              class="content-input">
          <span></span>
      </div>
      <div class="input">
          <input type="password" v-model="userPW" id="userPW" placeholder="PASSWORD" class="content-input">
          <span></span>
      </div>
      <div class="input" v-if="!isLoginMode">
          <input type="search" v-model="userName" id="userName" placeholder="이름" class="content-input">
          <span></span>
      </div>
      <div class="input" v-if="!isLoginMode">
          <input type="search" v-model="userAddr" id="userAddr" placeholder="주소" class="content-input">
          <span></span>
      </div>



      <div class="button-group" style="position: relative;">
          <label for="register" style="line-height: 50px;cursor:pointer;"
              v-html="isLoginMode?'계정이 없나요? <u>회원가입</u>':'로그인하러 가기'"></label> <input type="checkbox" name=""
              id="register" v-model="isLoginMode" style="display: none;">
          <input type="button" :value="isLoginMode?'로그인':'회원가입'" class="gradient_button" @click="handler">
      </div>
  </div>

  </div>
  `,
    data() {
        return {
            isAccountInfoMode: false,

            isLoginMode: true,
            userID: null,
            userPW: null,
            userName: null,
            userAddr: null,
        }
    },
    methods: {
        handler() {
            if (this.isEmpty(this.userID))
                alert("아이디를 입력해주세요. ")
            if (!this.isEmpty(this.userID) && this.isEmpty(this.userPW))
                alert("비밀번호를 입력해주세요. ")

            let xhr = new XMLHttpRequest()
            let form_data = new FormData()


            if (this.isLoginMode) {
                try {
                    // ================== authenticate(JWT Token 발급) ===========================
                    xhr.open("post", "http://localhost:8091/authenticate", false);
                    form_data.append("userID", this.userID);
                    form_data.append("password", this.userPW);
                    xhr.send(form_data);


                    // console.log(xhr.status, xhr.responseText);
                    const JWTtoken = xhr.responseText;
                    // ===================***********************************=========================


                    // ============================= 사용자 정보 발급 =============================
                    xhr.open("post", "http://localhost:8091/member/get", false);
                    xhr.setRequestHeader("Authorization", `Bearer ${JWTtoken}`);
                    form_data = new FormData();
                    form_data.append("userID", this.userID);
                    xhr.send(form_data);
                    // console.log(xhr.status, xhr.responseText);
                    const auth = JSON.parse(xhr.responseText)
                    // ===================***********************************=========================

                    // =================================== 세션 저장 ===================================
                    auth.JWTtoken = JWTtoken
                    auth.userPW = null
                    auth.userAddr = null
                    sessionStorage.setItem("auth", JSON.stringify(auth));
                    // ======================***********************************=========================



                    this.$router.push(`/portal/home`)

                } catch (error) {
                    alert("아이디나 비밀번호가 틀렸습니다..")

                }
            }
            else {
                // 회원가입 모드
                if (this.isEmpty(this.userName))
                    alert("이름을 입력해주세요. ")
                if (!this.isEmpty(this.userName) && this.isEmpty(this.userAddr))
                    alert("주소를 입력해주세요. ")


                xhr.open('post', `http://localhost:8091/member/get?userID=${this.userID}`, false)
                xhr.send(null)
                if (!xhr || xhr.length == 0) {
                    alert("이미 존재하는 ID입니다.")
                    return
                }

                try {
                    tmp = JSON.parse(xhr.responseText)
                    alert("이미 존재하는 ID입니다.")
                    return
                } catch (error) {

                }

                xhr.open('post', `http://localhost:8091/member/regist?userID=${this.userID}&userPW=${this.userPW}&userName=${this.userName}&userAddr=${this.userAddr}`, false)
                xhr.send(null)

                if (xhr.status == 200) {
                    alert("회원가입 성공!!!")

                    this.userID = this.userPW = null
                    this.isLoginMode = true
                }
            }
        },
        isEmpty(str) {
            return !str || str.length == 0
        },
        //   updateAccount() {
        //       if (this.isEmpty(this.userPW))
        //           alert("비밀번호를 입력해주세요. ")
        //       else if (this.isEmpty(this.userName))
        //           alert("이름을 입력해주세요. ")
        //       else if (this.isEmpty(this.userAddr))
        //           alert("주소를 입력해주세요. ")

        //       let xhr = new XMLHttpRequest()
        //       xhr.open('post', `http://localhost:8091/member/update?userID=${this.userID}&userPW=${this.userPW}&userName=${this.userName}&userAddr=${this.userAddr}`, false)
        //       xhr.send(null)

        //       if (xhr.status == 200)
        //           alert("수정했습니다.")
        //   },

        //   deleteAccount() {
        //       if (!confirm("삭제를 하게 되면 복구가 불가능합니다.\n삭제하시겠습니까?"))
        //           return

        //       let xhr = new XMLHttpRequest()
        //       xhr.open('post', `http://localhost:8091/member/delete?userID=${this.userID}`, false)
        //       xhr.send(null)

        //       if (xhr.status == 200)
        //           alert("삭제되었습니다.")
        //   },
    },

    created() {
        //   const query = window.location.search;
        //   const param = new URLSearchParams(query);
        //   const id = param.get('userID');


        //   let xhr = new XMLHttpRequest()
        //   xhr.open('post', `http://localhost:8091/member/get?userID=${id}`, false)
        //   xhr.send(null)

        //   try {
        //       this.isAccountInfoMode = JSON.parse(xhr.responseText)
        //       this.userID = this.isAccountInfoMode.userID
        //       this.userPW = this.isAccountInfoMode.userPW
        //       this.userName = this.isAccountInfoMode.userName
        //       this.userAddr = this.isAccountInfoMode.userAddr
        //   } catch (error) {

        //   }

        //   history.replaceState({}, null, location.pathname);
    }

};
