export default {
  template: `
  <div class="app-content">
      
      <div class="board-writer">

        
            <ul class="board-list" v-if="resultData.length > 0">
              <li class="board-item" v-for="(item, i) in resultData" @click="moveView(i)">
                  <div class="board-item-index">{{i}}</div>
                <div class="board-item-title">
                  <div class="before"></div>
                  <div class="title-content" v-html="item.title"></div>
                </div>
                <div class="board-item-detail">
                  <div class="board-item-detail-icon">
                    <i class="fa-regular fa-bench-tree"></i>
                  </div>
                  <div class="board-item-detail-views">{{item.views}}</div>
                </div>
                <div class="board-item-place">
                  <div class="board-item-place-name">{{item.place}}</div>
                  <div class="board-item-place-position">
                    {{item.placePos}}
                  </div>
                </div>
        
                <div class="writer-name">{{item.userID}}</div>
              </li>
            </ul>

            <div v-else>
                  데이터가 없습니다.
            </div>
        
          
      </div>
      
          
  
  </div>
        `,
        data() {
            return {
                resultData: [],
                jwtToken: null,
            }
        },
        created() {
          this.jwtToken = JSON.parse(sessionStorage.getItem("auth"))
          this.jwtToken = this.jwtToken.JWTtoken


            let xhr = new XMLHttpRequest()
            xhr.open("post","http://localhost:8091/board/get/all",false)
            xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
            xhr.send(null)
            try {
                this.resultData = JSON.parse(xhr.responseText)
    console.log(this.resultData)
                for (let i = 0;i < this.resultData.length;i++){
                    if (this.resultData[i].service_name == "house"){
                        
                        this.resultData[i].place = this.resultData[i].aptName
                        this.resultData[i].placePos = `${this.resultData[i].aptSidoVal} ${this.resultData[i].aptGugunVal} ${this.resultData[i].aptDong} ${this.resultData[i].aptJibun}`
    
                    }
                    else if (this.resultData[i].service_name == "explore"){
                      xhr.open("post",`http://localhost:8091/park/get/${this.resultData[i].id}`,false)
                      xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
                      xhr.send(null)
    
    
                      const tmp = JSON.parse(xhr.responseText)
    
    
                      this.resultData[i].place = tmp.p_PARK
                      this.resultData[i].placePos = tmp.p_ADDR
    
                    }
                }
            } catch (error) {
                alert("서버에 오류가 발생하였습니다.\n잠시후에 다시 시도해주세요.")
            }
        },
        methods: {
            moveView(idx){
                console.log(this.resultData[idx].id)
                this.$router.push(`/portal/board/viewer/${this.resultData[idx].id}`)
                
            }
        },
};
