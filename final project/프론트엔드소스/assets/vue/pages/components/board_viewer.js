export default {
  template: `
  
  <div class="app-content">

  <div class="board-writer">

      <div class="title">
          <input type="search" placeholder="제목 입력" id="board-title" :value="title" readonly
              style="cursor: default;">
      </div>

      <div class="section board-viewer-content" v-html="content">
      </div>


      <div class="button-group">
          <button @click="updateBoardContent()" class="button">수정하기</button>
          <button @click="deleteBoardContent()" class="button alert-color">삭제</button>
      </div>

  </div>

</div>
        `,
        data() {
            return {
                title: null,
                content: null,
                id: null,
                userID: null,
                jwtToken: null,
            }
        },
        created() {
            this.jwtToken = JSON.parse(sessionStorage.getItem("auth"))
            this.userID = this.jwtToken.userID
            this.jwtToken = this.jwtToken.JWTtoken
            this.id = this.$route.params.article_id

            
            if (!this.id) {
                alert("잘못된 접근입니다.")
                return
            }

            const xhr = new XMLHttpRequest()
            const form_data = new FormData()

            xhr.open('post', "http://localhost:8091/board/read", false)
            form_data.append("id", this.id)
            form_data.append("userID", this.userID)
            form_data.append("opened", true)
            xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
            xhr.send(form_data)

            console.log(xhr.responseText)
            try {
                const ret = JSON.parse(xhr.responseText)
                console.log(ret)


                this.title = ret.title
                this.content = ret.content

            } catch (error) {
                console.error("게시판 내용 파싱에러")
            }
        },
        methods: {



            updateBoardContent() {
                this.$router.push(`/portal/board/updater/${this.id}`)
            },

            deleteBoardContent() {
                const xhr = new XMLHttpRequest()
            const form_data = new FormData()
                xhr.open('post', `http://localhost:8091/board/delete`, false)
                form_data.append("userID",this.userID)
                form_data.append("id",`${this.id}`)
                xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
                xhr.send(form_data)
                
                if (xhr.status == 200) {
                    alert("삭제되었습니다.")
                    this.$router.push(`/portal/board/list/all`)

                }
                else
                    alert("서버에 오류가 발생하였습니다.\n잠시후 다시 시도해주세요.")

            },
        }
};
