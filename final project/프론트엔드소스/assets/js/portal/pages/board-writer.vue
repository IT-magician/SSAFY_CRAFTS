<template>
  
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
</template>

<script>

<script>
        new Vue({
            el: ".app-container",
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

                    form_data.enctype = 'multipart/form-data'
                    form_data.method = 'post'

                    form_data.append("board_title", title)
                    form_data.append("board_content", content)

                    xhr.open('post', "http://localhost:8091/board/write", true)
                    xhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            alert("저장 완료했습니다.")
                        }
                        // else
                        //     alert("서버에 문제가 발생하였습니다. 잠시후에 다시 시도해주세요")
                    }
                    xhr.send(form_data)
                },

            },
            created() {
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

            }
        })


export default {

}
</script>


<style>
</style>