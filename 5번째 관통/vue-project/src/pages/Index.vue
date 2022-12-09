<template>
  <div class="section-index">
    <div class="background-img">
      <img src="img/bg11.jpg" alt="" />
    </div>

    <div id="map"></div>

    <div class="search-district">
      <div class="form-group input-boxes">
        <div class="select">
          <select name="" id="" class="form-control" @change="updateGugun">
            <option value="null">시도선택</option>
            <option
              :value="item.code.slice(0, 2)"
              v-for="item in sido"
              :key="item.code"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="select">
          <select name="" id="" class="form-control" @change="updateDong">
            <option value="null">구군선택</option>
            <option
              :value="item.code.slice(0, 5)"
              v-for="item in gugun"
              :key="item.code"
            >
              {{ item.name.slice(item.name.indexOf(" ") + 1) }}
            </option>
          </select>
        </div>

        <div class="select">
          <select name="" id="" class="form-control" @change="updatedongCode">
            <option value="null">동선택</option>
            <option :value="item.code" v-for="item in dong" :key="item.code">
              {{
                item.name.slice(
                  item.name.indexOf(" ", item.name.indexOf(" ") + 1) + 1
                )
              }}
            </option>
          </select>
        </div>

        <button type="button" class="btn btn-round btn-default" @click="search">
          찾기
        </button>
      </div>

      <div>
        <table
          class="table table-hover apartment"
          v-if="resultData.length > 0"
          @click="handleClick"
        >
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">아파트이름</th>
              <th scope="col">층</th>
              <th scope="col">면적</th>
              <th scope="col">법정동</th>
              <th scope="col">거래금액</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :value="item.code"
              v-for="(item, index) in resultData"
              :key="index"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.apt }}</td>
              <td>{{ item.floor }}</td>
              <td>{{ item.area }} m²</td>
              <td>{{ item.dong }}</td>
              <td>{{ item.transactionAmount }} 만원</td>
              <td>{{ item.x }}</td>
              <td>{{ item.y }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  bodyClass: "index-page",
  components: {},

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
    };
  },
  methods: {
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
    },

    updatedongCode(e) {
      this.dongCode = e.target.value;
      // console.log(this.sidoCode, this.gugunCode, this.dongCode)
    },

    search() {
      for (let i = 0; i < this.resultData.length; i++){
        this.resultData[i].infowindow.close()
        this.resultData[i].marker.setMap(null)
      }
      this.resultData = []



      let xhr = new XMLHttpRequest();
      xhr.open(
        "get",
        `http://localhost//getApartment?sVal=${this.sidoCode}&gVal=${this.gugunCode}&dVal=${this.dongCode}&sidoVal=${this.sidoVal}&gugunVal=${this.gugunVal}`,
        false
      );
      xhr.send(null);

      console.log(this.sidoVal, this.gugunVal);

      this.resultData = JSON.parse(xhr.responseText);

      for (let i = 0; i < this.resultData.length; i++) {
        xhr.open(
          "GET",
          `https://dapi.kakao.com/v2/local/search/address.json?query=${this.sidoVal} ${this.gugunVal} ${this.resultData[i].dong} ${this.resultData[i].jibun}`,
          false
        );

        xhr.setRequestHeader(
          "Authorization",
          "KakaoAK 79c6d214ca859ea2806d6bd426ffb1fe"
        );

        // console.log(`https://dapi.kakao.com/v2/local/search/address.json?query=${this.sidoVal} ${this.gugunVal} ${this.resultData[i].dong} ${this.resultData[i].jibun}`)
        xhr.send(null);

        this.resultData[i].gps =
          xhr.status == 200 && xhr.responseText.length > 0
            ? JSON.parse(xhr.responseText)
            : null;

        this.resultData[i].x =
          xhr.status == 200 && xhr.responseText.length > 0
            ? this.resultData[i].gps.documents[0].road_address.x
            : null;
        this.resultData[i].y =
          xhr.status == 200 && xhr.responseText.length > 0
            ? this.resultData[i].gps.documents[0].road_address.y
            : null;




        this.resultData[i].marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(
            this.resultData[i].y,
            this.resultData[i].x
          ),
        });

        this.resultData[i].marker.setMap(this.map);
        this.resultData[i].infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${this.resultData[i].apt} <br><a href="https://map.kakao.com/link/map/${this.resultData[i].apt},${this.resultData[i].y},${this.resultData[i].x}" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${this.resultData[i].apt},${this.resultData[i].y},${this.resultData[i].x}" style="color:blue" target="_blank">길찾기</a></div>`,
          position: new kakao.maps.LatLng(
            this.resultData[i].y,
            this.resultData[i].x
          ),
        });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        this.resultData[i].infowindow.open(this.map, this.marker);
      }

      this.map.setCenter(
          new kakao.maps.LatLng(
            this.resultData[0].y,
            this.resultData[0].x)
        );
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
    let xhr = new XMLHttpRequest();
    xhr.open(
      "get",
      `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000&is_ignore_zero=true`,
      false
    );
    xhr.send(null);

    let ret = JSON.parse(xhr.responseText);

    this.sido = ret.regcodes;
  },

  mounted() {
    let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  },
};
</script>
<style></style>
