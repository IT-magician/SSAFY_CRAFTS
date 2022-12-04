export default {
  template: `
  
  <div class="app-content">

    <div class="board-writer">

        <div class="section app-content-window">

            <ul class="search">

                <li class="search-list" v-for="(item, i) in resultData" @click="moveWriter(i)">
                    <div class="search-list-item">
                    <div class="bold">공원명 : </div>
                        {{ item.p_PARK }}
                    </div>
                    <div class="search-list-item">
                        <div class="bold">공원주소 : </div>
                        {{item.p_ADDR}}
                    </div>
                    <div class="search-list-item">
                        <div class="bold">공원설명 : </div>
                        {{item.p_LIST_CONTENT}}
                    </div>

                    
                    <div class="search-list-item aptlongitude">
                        {{ item.longitude }}
                    </div>
                    <div class="search-list-item aptlongitude">
                        {{ item.latitude }}
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

            // sidoVal: null,
            // gugunVal: null,
            // sido: [],
            // gugun: [],
            // dong: [],
            // sidoCode: null,
            // gugunCode: null,
            // dongCode: null,

            P_PARK: null,
            P_LIST_CONTENT: null,
            AREA: null,
            VISIT_ROAD: null,
            P_ZONE: null,
            P_ADMINTEL: null,
            P_ADDR: null,

            P_PARKS: [],
            P_AREAS: [],
            P_ZONES: ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"],

            resultData: [],

            isOpened: true,

            
            jwtToken: null,
        };
    },
    methods: {
      moveWriter(idx){
          console.log("moveWriter",this.resultData[idx].id)
          this.$router.push(`/portal/board/writer/explore/${this.resultData[idx].id}`)

      },
        searchP_PARK(e) {


            let xhr = new XMLHttpRequest();
            let formData = new FormData();

            console.log("@@!@!!")
            console.log(e.target.options);

            formData.append("P_PARK", `${this.P_PARK}`)

            console.log(formData)

            xhr.open(
                "post", `http://localhost:8091/park/get/parks`,false
            );
            xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
            xhr.send(formData);
            console.log(xhr.status);

            alert(xhr.status);

            if(xhr.status==200) {
                try {
                    if(xhr.responseText.length == 0) throw "정보 없음" 
                    this.resultData = JSON.parse(xhr.responseText)
                    for(let i=0; i<this.resultData.length; i++)
                        this.resultData[i].recentUpdated = (new Date()).getTime()

                } catch (error) {
                    return
                }
            }

        },

        search() {
            // ================================ get data from db =============================================
            let xhr = new XMLHttpRequest()
            let formData = new FormData()

            formData.append("P_PARK", `${this.P_PARK}`)
            formData.append("P_LIST_CONTENT", `${this.P_LIST_CONTENT}`)
            formData.append("AREA", `${this.AREA}`)
            formData.append("VISIT_ROAD",`${this.VISIT_ROAD}`)
            formData.append("P_ZONE", `${this.P_ZONE}`)
            formData.append("P_ADMINTEL", `${this.P_ADMINTEL}`)
            formData.append("P_ADDR", `${this.P_ADDR}`)

            xhr.open(
                "post", `http://localhost:8091/park/get`, false
            );
            xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
            xhr.send(formData);

            if (xhr.status == 200) {
                try {
                    if (xhr.responseText.length == 0) throw "공원 정보 없음"

                    this.resultData = JSON.parse(xhr.responseText)
                    for (let i = 0; i < this.resultData.length; i++)
                        this.resultData[i].recentUpdated = (new Date()).getTime()
                    console.log(this.resultData)
                } catch (error) {
                    return
                }
            }
        },

        handleClick(e) {
            const tableRow = e.target.parentNode;

            if (tableRow.childNodes.length > 6) {
                const LONGITUDE = tableRow.childNodes[6].innerHTML;
                const LATITUDE = tableRow.childNodes[7].innerHTML;

                console.log(LONGITUDE, LATITUDE);

                this.map.setCenter(
                    new kakao.maps.LatLng(LONGITUDE, LATITUDE /*33.452613, 126.570888*/)
                );
            }
        },

        closeWindow(e) {
            this.isWindowOpened = false
        }
    },

    created() {
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








      
                        // ================================ close map marker & infowindow =================================
                        for (let i = 0; i < this.resultData.length; i++) {
                          this.resultData[i].infowindow.close()
                          this.resultData[i].marker.setMap(null)
                      }
                      this.resultData = []
          
          
                      // ====================*******************************************************=====================
          



      this.jwtToken = JSON.parse(sessionStorage.getItem("auth"))
      this.jwtToken = this.jwtToken.JWTtoken


      let xhr = new XMLHttpRequest();
      let form_data = new FormData();

      xhr.open(
          "post",
          `http://localhost:8091/park/get`,
          false
      );
      xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
      xhr.send(form_data);
console.log()
      let res = JSON.parse(xhr.responseText);
      this.resultData = JSON.parse(xhr.responseText)
  
      console.log(res);

      for(let i=0, j=0; i<res.length; i++, j++){
          this.P_PARKS[i] = res[i].p_PARK;

          
          if(res[i].area.length>20) {
              j--;
              continue;
          }
          this.P_AREAS[j] = res[i].area;




      }

console.log(this.resultData)      
              // ================================ open map marker & infowindow =================================
              for (let i = 0; i < this.resultData.length; i++) {
                if (!this.resultData[i].latitude || !this.resultData[i].longitude) continue

                this.resultData[i].marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(
                        this.resultData[i].latitude,
                        this.resultData[i].longitude
                    ),
                });

                this.resultData[i].marker.setMap(this.map);
                this.resultData[i].infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;">${this.resultData[i].p_PARK} <br><a href="https://map.kakao.com/link/map/${this.resultData[i].p_PARK},${this.resultData[i].latitude},${this.resultData[i].longitude}" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${this.resultData[i].p_PARK},${this.resultData[i].latitude},${this.resultData[i].longitude}" style="color:blue" target="_blank">길찾기</a></div>`,
                    position: new kakao.maps.LatLng(
                        this.resultData[i].latitude,
                        this.resultData[i].longitude
                    ),
                });

                // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
                this.resultData[i].infowindow.open(this.map, this.marker);

            }
// console.log(this.map)
            if (this.resultData[0].latitude != null && this.resultData[0].longitude != null)
                this.map.setCenter(
                    new kakao.maps.LatLng(
                        this.resultData[0].latitude,
                        this.resultData[0].longitude)
                );

            // ====================*******************************************************=====================
  },


};
