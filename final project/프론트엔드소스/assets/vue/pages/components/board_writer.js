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
          <button @click="saveBoardContent()" class="button">발행하기</button>
      </div>
  </div>
  

</div>
        `,
        data() {
            return {
                service_name: null,
                service_item_id: null,
                userID: null,
                jwtToken: null,
            }
        },
        methods: {
            saveBoardContent() {
                const title = document.getElementById('board-title').value
                const content = document.getElementById('summernote').value
    
                if (!title || title.length < 1) {
                    alert("제목을 입력해주세요")
                    return
                }
    
                if (!content || content.length < 1) {
                    alert("내용을 입력해주세요")
                    return
                }
    
                const xhr = new XMLHttpRequest()
                const form_data = new FormData()
    
                form_data.method = 'post'
    
                form_data.append("title", title)
                form_data.append("content", content)
                form_data.append("service_name", this.service_name)
                form_data.append("service_item_id", this.service_item_id)
    
                
                if (this.service_name == "house"){
                        xhr.open("post",`http://localhost:8091/building/search?id=${this.service_item_id}`,false)
                        xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
                        xhr.send(null)
                    try {
    console.log(this.service_item_id)                    
    console.log(xhr.responseText)
                        const apt = JSON.parse(xhr.responseText)
                        form_data.append("AptId", apt.id)
                        form_data.append("AptName", apt.aptName)
                        form_data.append("AptSidoVal", apt.sidoVal)
                        form_data.append("AptGugunVal",apt.gugunVal)
                        form_data.append("AptDong",apt.aptDong)
                        form_data.append("AptJibun",apt.aptJibun)
                    
                    } catch (error) {
                        alert("서버에 문제가 발생하였습니다.\n잠시후 다시 시도해주세요.")
                        return
                    }
                }
                else{
    
                }
                
                form_data.append("userID", this.userID) // dummy instead of 'jwt token'
    // console.log(title,content,this.service_name,this.service_item_id)
                xhr.open('post', "http://localhost:8091/board/write", false)
                xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
                xhr.send(form_data)
                
                if (xhr.status == 200) {
                    alert("발행을 완료했습니다.")
                    this.$router.push(`/portal/board/list/all`)
                }
                else
                    alert("서버에 문제가 발생하였습니다. 잠시후에 다시 시도해주세요")
            },
    
            closeWindow() {
    
            },
    
        },
        created() {
            this.jwtToken = JSON.parse(sessionStorage.getItem("auth"))
            this.userID = this.jwtToken.userID
            this.jwtToken = this.jwtToken.JWTtoken
    
            this.service_name = this.$route.params.service_name
            this.service_item_id = this.$route.params.service_item_id
            
    
    
            console.log(this.service_name, this.service_item_id, this.userID)
    
            if (!this.service_name || !this.service_item_id || !this.userID) {
                alert("잘못된 접근입니다.")
                return
            }





    
    
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
                                        let json = JSON.parse(xhr.responseText)
console.log(xhr.responseText)
                                        for (const file of json) {console.log(file.filePath)
                                            $('#summernote').summernote('insertImage', file.filePath)
                                        }
    
                                    } catch (error) {
    console.error(error)
                                    }
                                }
                            }
                            
            let jwtToken = JSON.parse(sessionStorage.getItem("auth"))
            let userID = jwtToken.userID
            jwtToken = jwtToken.JWTtoken
                            form_data.append("userID",userID)
                            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
                            xhr.send(form_data)


    // console.log(jwtToken)
    // console.log(xhr.status, xhr.responseText)
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
    
        }
};
