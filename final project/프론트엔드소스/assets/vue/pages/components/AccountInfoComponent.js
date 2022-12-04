export default {
  template: `
    <div>
    
    
    
    <div class="content">
    <div class="input">
        <input type="search" v-model="resultData.userID" id="userID" :placeholder="isLoginMode?'ID':'ID'"
            class="content-input" disabled>
        <span></span>
    </div>
    <div class="input">
        <input type="search" v-model="resultData.userPW" id="userPW" placeholder="PASSWORD" class="content-input">
        <span></span>
    </div>
    <div class="input">
        <input type="search" v-model="resultData.userName" id="userName" placeholder="이름" class="content-input">
        <span></span>
    </div>
    <div class="input">
        <input type="search" v-model="resultData.userAddr" id="userAddr" placeholder="주소" class="content-input">
        <span></span>
    </div>



    <div class="button-group" style="position: relative;">
        <input type="button" value="회원정보 수정" class="gradient_button" @click="updateAccount">
        <input type="button" value="회원탈퇴" class="gradient_button gradient-5" @click="deleteAccount">
    </div>
</div>
  
    </div>
    `,
    data() {
        return {
            
            isLoginMode: true,
            resultData: {},
            jwtToken: null,
        }
    },
    created() {
        this.jwtToken = JSON.parse(sessionStorage.getItem("auth"))
        this.jwtToken = this.jwtToken.JWTtoken

        console.log(this.$route.params.userID)

        let xhr = new XMLHttpRequest()
        let form_data = new FormData()

        xhr.open("post","http://localhost:8091/member/get",false)

        form_data.append("userID", this.$route.params.userID)
        xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
        xhr.send(form_data)

        // console.log(xhr.responseText)
        try {
            this.resultData = JSON.parse(xhr.responseText)
            console.log(this.resultData)
        } catch (error) {
            // this.$router.push(`/portal`)
            alert("서버에 오류가 발생하였습니다.\n잠시후에 다시 시도해주세요.")
        }
    },
    methods: {
        
        isEmpty(str) {
            return !str || str.length == 0
        },
        updateAccount() {
            if (this.isEmpty(this.resultData.userPW)){
                alert("비밀번호를 입력해주세요. ")
                return
            }
            else if (this.isEmpty(this.resultData.userName)){
                alert("이름을 입력해주세요. ")
                return
            }
            else if (this.isEmpty(this.resultData.userAddr)){
                alert("주소를 입력해주세요. ")
                return
            }

            let xhr = new XMLHttpRequest()
            xhr.open('post', `http://localhost:8091/member/update?userID=${this.resultData.userID}&userPW=${this.resultData.userPW}&userName=${this.resultData.userName}&userAddr=${this.resultData.userAddr}`, false)
            xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
            xhr.send(null)

            if (xhr.status == 200)
                alert("수정했습니다.")
                this.$router.push(`/portal/home`)
        },

        deleteAccount() {
            if (!confirm("삭제를 하게 되면 복구가 불가능합니다.\n삭제하시겠습니까?"))
                return

            let xhr = new XMLHttpRequest()
            xhr.open('post', `http://localhost:8091/member/delete?userID=${this.resultData.userID}`, false)
            xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
            xhr.send(null)

            if (xhr.status == 200){
                sessionStorage.removeItem("auth")
                alert("삭제되었습니다.")
                this.$router.push(`/`)

            }
        },
    },
};
