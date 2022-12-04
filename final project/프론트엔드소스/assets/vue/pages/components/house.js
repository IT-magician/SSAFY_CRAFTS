export default {
  template: `
      
      
  <div class="app-content">
            
  <div class="board-writer">



      <div class="section app-content-window">


          <div class="categories">


              <select name="" id="" @change="updateGugun">
                  <option value="null">시도선택</option>
                  <option :value="item.code" v-for="item in sido" :key="item.code">
                      {{ item.name }}
                  </option>
              </select>


              <select name="" id="" @change="updateDong">
                  <option value="null">구군선택</option>
                  <option :value="item.code" v-for="item in gugun" :key="item.code">
                      {{ item.name.slice(item.name.indexOf(" ") + 1) }}
                  </option>
              </select>


              <select name="" id="" @change="updatedongCode">
                  <option value="null">동선택</option>
                  <option :value="item.code" v-for="item in dong" :key="item.code">
                      {{
                      item.name.slice(item.name.indexOf(" ", item.name.indexOf(" ") + 1) + 1)
                      }}
                  </option>
              </select>

              <button type="button" class="button" @click="search">
                  찾기
              </button>

          </div>

          <ul class="search">

              <li class="search-list" v-for="(item, i) in resultData" @click="moveWriter(i)" @dblclick="moveMap(i)">
                  <div class="search-list-item aptName">
                      {{ item.aptName }}
                  </div>
                  <div class="search-list-item aptFloor">
                      {{ item.aptFloor }}
                  </div>
                  <div class="search-list-item aptSize">
                      {{ item.aptSize }}
                  </div>
                  <div class="search-list-item aptDong">
                      {{ item.aptDong }}
                  </div>
                  <div class="search-list-item aptPrice">
                      {{ item.aptPrice }}
                  </div>
                  <div class="search-list-item aptLatX">
                      {{ item.latX }}
                  </div>
                  <div class="search-list-item aptLatY">
                      {{ item.latY }}
                  </div>
              </li>
          </ul>











      </div>

      <input type="checkbox" name="" id="opener" v-model="isOpened">
      <label for="opener" class="opener-label"><i class="fa-light fa-up-right-from-square"></i></label>
  </div>
  <div id="map"></div>

</div>
      
    
      `,

      data() {
          return {
              map: null,
  
              sidoVal: null,
              gugunVal: null,
  
              sido: [],
              gugun: [],
              dong: [],
  
              sidoCode: null,
              gugunCode: null,
              dongCode: null,
  
              resultData: [],
  
              isOpened: true,

              jwtToken: null,
          };
      },
      methods: {
        moveMap(idx){

        },
          moveWriter(idx){
              console.log("moveWriter",this.resultData[idx].id)
              this.$router.push(`/portal/board/writer/house/${this.resultData[idx].id}`)
  
          },
  
          updateGugun(e) {
              let xhr = new XMLHttpRequest();
              xhr.open(
                  "get",
                  `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${e.target.value}*00000&is_ignore_zero=true`,
                  false
              );
              xhr.send(null);
              if (xhr.status != 200) {
                  // this.gugun = []
                  return;
              }
  
              this.sidoCode = e.target.value;
  
              // console.log(this.sidoCode, this.gugunCode)
  
              this.sidoVal =
                  e.target.value == null
                      ? null
                      : e.target.options[e.target.selectedIndex].text;
  
              let ret = JSON.parse(xhr.responseText);
              this.gugun = ret.regcodes;
  
              for (let i = 0; i < this.gugun.length; i++) {
                  this.gugun[i].code = this.gugun[i].code.slice(0, 5)
                  this.gugun[i].name = this.gugun[i].name.slice(this.gugun[i].name.indexOf(" ") + 1)
              }
          },
  
          updateDong(e) {
              let xhr = new XMLHttpRequest();
              xhr.open(
                  "get",
                  `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${e.target.value}*&is_ignore_zero=true`,
                  false
              );
              xhr.send(null);
              if (xhr.status != 200) {
                  // this.dong = []
                  return;
              }
  
              this.gugunCode = e.target.value;
  
              this.gugunVal =
                  e.target.value == null
                      ? null
                      : e.target.options[e.target.selectedIndex].text;
  
              // console.log(this.sidoCode, this.gugunCode)
  
              let ret = JSON.parse(xhr.responseText);
              this.dong = ret.regcodes;
              for (let i = 0; i < this.dong.length; i++)
                  this.dong[i].name = this.dong[i].name.slice(this.dong[i].name.indexOf(" ", this.dong[i].name.indexOf(" ") + 1) + 1)
          },
  
          updatedongCode(e) {
              this.dongCode = e.target.value;
              // console.log(this.sidoCode, this.gugunCode, this.dongCode)
          },
  
          search() {
              // ================================ close map marker & infowindow =================================
              for (let i = 0; i < this.resultData.length; i++) {
                  this.resultData[i].infowindow.close()
                  this.resultData[i].marker.setMap(null)
              }
              this.resultData = []
  
  
              // ====================*******************************************************=====================
  
  
              // ================================ get data from db =============================================
              let xhr = new XMLHttpRequest()
              let formData = new FormData()
  
              formData.append("sVal", `${this.sidoCode}`)
              formData.append("gVal", `${this.gugunCode}`)
              if (this.dongCode)
                  formData.append("dVal", `${this.dongCode}`)
              if (this.sidoVal)
                  formData.append("sidoVal", `${this.sidoVal}`)
              if (this.gugunVal)
                  formData.append("gugunVal",`${this.gugunVal}`)
  
              xhr.open(
                  "post", `http://localhost:8091/building/get`, false
              );
              xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);console.log("debug",this.jwtToken,this.sidoCode,this.gugunCode,this.dongCode,this.sidoVal,this.gugunVal)
              xhr.send(formData);
  console.log(this.jwtToken, xhr.status, xhr.responseText)
              if (xhr.status == 200) {
                  try {
                      if (xhr.responseText.length == 0) throw "건물 정보 없음"
  
                      this.resultData = JSON.parse(xhr.responseText)
                      for (let i = 0; i < this.resultData.length; i++)
                          this.resultData[i].recentUpdated = (new Date()).getTime()
                      console.log(this.resultData)
                  } catch (error) {
                      return
                  }
              }
  
              // ====================*******************************************************=====================
  
              // ================================ open map marker & infowindow =================================
              for (let i = 0; i < this.resultData.length; i++) {
                  if (!this.resultData[i].latY || !this.resultData[i].latX) continue
  
                  this.resultData[i].marker = new kakao.maps.Marker({
                      position: new kakao.maps.LatLng(
                          this.resultData[i].latY,
                          this.resultData[i].latX
                      ),
                  });
  
                  this.resultData[i].marker.setMap(this.map);
                  this.resultData[i].infowindow = new kakao.maps.InfoWindow({
                      content: `<div style="padding:5px;">${this.resultData[i].aptName} <br><a href="https://map.kakao.com/link/map/${this.resultData[i].aptName},${this.resultData[i].latY},${this.resultData[i].latX}" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${this.resultData[i].aptName},${this.resultData[i].latY},${this.resultData[i].latX}" style="color:blue" target="_blank">길찾기</a></div>`,
                      position: new kakao.maps.LatLng(
                          this.resultData[i].latY,
                          this.resultData[i].latX
                      ),
                  });
  
                  // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
                  this.resultData[i].infowindow.open(this.map, this.marker);
  
              }
  
              if (this.resultData[0].latY != null && this.resultData[0].latX != null)
                  this.map.setCenter(
                      new kakao.maps.LatLng(
                          this.resultData[0].latY,
                          this.resultData[0].latX)
                  );
  
              // ====================*******************************************************=====================
          },
  
          handleClick(e) {
              const tableRow = e.target.parentNode;
  
              if (tableRow.childNodes.length > 6) {
                  const latX = tableRow.childNodes[6].innerHTML;
                  const latY = tableRow.childNodes[7].innerHTML;
  
                  console.log(latX, latY);
  
                  this.map.setCenter(
                      new kakao.maps.LatLng(latY, latX /*33.452613, 126.570888*/)
                  );
              }
          },
  
      },
  
      created() {
        this.jwtToken = JSON.parse(sessionStorage.getItem("auth"))
        this.jwtToken = this.jwtToken.JWTtoken

          let xhr = new XMLHttpRequest();
          xhr.open(
              "get",
              `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000&is_ignore_zero=true`,
              false
          );
            xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
          xhr.send(null);
  
          let ret = JSON.parse(xhr.responseText);
  
          this.sido = ret.regcodes;
  
          for (let i = 0; i < this.sido.length; i++) {
  
              this.sido[i].code = this.sido[i].code.slice(0, 2)
          }
      },
  
      mounted() {
          let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
          let options = {
              //지도를 생성할 때 필요한 기본 옵션
              center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
              level: 3, //지도의 레벨(확대, 축소 정도)
          };
  
          this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
          



          document.querySelector(".sidebar").addEventListener('dblclick',(e) => {
            this.isOpened = false
          })
      },
};
