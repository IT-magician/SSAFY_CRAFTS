export default {
  template: `
  <div class="app-content">

      <div class="board-writer">

          <div class="title">
              <input type="search" placeholder="제목 입력" id="board-title">
          </div>
  
          <div class="section">
              <textarea id="summernote" name="editordata"></textarea>
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
                jwtToken: null,
                userID: null,
            }
        },

mounted() {


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
            xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
            xhr.send(form_data)

            console.log(xhr.responseText)
            try {
                const ret = JSON.parse(xhr.responseText)
                console.log(ret)

                document.getElementById("board-title").value = ret.title
    document.getElementById('summernote').value = ret.content

            } catch (error) {
                console.error("게시판 내용 파싱에러")
            }


},





        created() {
            this.jwtToken = JSON.parse(sessionStorage.getItem("auth"))
            this.userID = this.jwtToken.userID
            this.jwtToken = this.jwtToken.JWTtoken


            $(document).ready(function () {
        //여기 아래 부분
        $('#summernote').summernote({
            height: null,                 // 에디터 높이
            minHeight: 500,             // 최소 높이
            maxHeight: null,             // 최대 높이
            focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
            lang: "ko-KR",					// 한글 설정
            placeholder: '여러분들의 방문후기를 남겨주세요!!',	//placeholder 설정

            toolbar: [
                // [groupName, [list of button]]
                ['fontname', ['fontname']],
                ['fontsize', ['fontsize']],
                ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                ['color', ['forecolor', 'color']],
                ['table', ['table']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['insert', ['picture', 'link', 'video']],
                ['view', [/*'fullscreen', 'help'*/]]
            ],
            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', '맑은 고딕', '궁서', '굴림체', '굴림', '돋움체', '바탕체'],
            fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '30', '36', '50', '72'],

            maximumImageFileSize: 25 * 1024 * 1024, // 25MB
            callbacks: { // 이미지 파일을 파일서버에 저장했다가 사용하기 위한 로직

                onImageUpload: (files) => {
                    for (const file of files)
                        if (25 * 1024 * 1024 < file.size) {
                            alert(`파일 크기는 1B를 넘을 수 없습니다.`)
                            return
                        }

                    const xhr = new XMLHttpRequest()
                    const form_data = new FormData()

                    form_data.enctype = 'multipart/form-data'
                    form_data.method = 'post'

                    for (const file of files) {
                        form_data.append('content_image', file)
                    }
                    // form_data.append('content_image', files[0])

                    xhr.open('post', "http://localhost:8091/board/content_image", true)
                    xhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {

                            try {
                                json = JSON.parse(xhr.responseText)

                                if (!(this.readyState == 4 && this.status == 200)) return


                                for (const file of json) {
                                    $('#summernote').summernote('insertImage', file.filePath + file.saveFileName)
                                }

                            } catch (error) {

                            }
                        }
                    }
                    xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
                    xhr.send(form_data)

                    // console.log(form_data)
                },

                onPaste: function (e) {
                    const clipboardData = e.originalEvent.clipboardData;
                    if (clipboardData && clipboardData.items && clipboardData.items.length) {
                        const item = clipboardData.items[0];
                        if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                            e.preventDefault();
                        }
                    }
                },


            }
        });
    });


        },









        methods: {

          updateBoardContent() {
            const xhr = new XMLHttpRequest()
        const form_data = new FormData()
            xhr.open('post', `http://localhost:8091/board/update`, false)
        form_data.append("title",document.getElementById("board-title").value)
        form_data.append("content",document.getElementById('summernote').value)
        form_data.append("id",this.id)
        form_data.append("userID",this.userID)
        xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
            xhr.send(form_data)

            if (xhr.status == 200) {
                alert("수정되었습니다.")
                // this.$router.push(`/portal/board/list/all`)

            }
            else
                alert("서버에 오류가 발생하였습니다.\n잠시후 다시 시도해주세요.")
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
