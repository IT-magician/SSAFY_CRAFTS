let mapContainer_favor;
let mapOption_favor;

window.addEventListener('load',function (e) {
	sendRequest("sido", "*00000000");

	  let s = document.querySelector("#sido");
//	  console.log(s.options.length);
	  for (let i = 1; i < s.options.length; i++) {
	    if (getParams[0].split("=")[1] == s.options[i].value) {
	      s.options[i].selected = 1;
	    }
	  }
	  }
	)

function loadMap(){
	mapContainer_favor = document.querySelector('#map-favor'), // 지도를 표시할 div 
    
    mapOption_favor = {
        center: new kakao.maps.LatLng(36.3503849976553, 127.384633005948), // 지도의 중심좌표
        // level: 6 // 지도의 확대 레벨
        level: 13
    };

	// 지도를 생성합니다    
	map = new kakao.maps.Map(mapContainer_favor, mapOption_favor);
}

function updateUserFavor(){
	  let xhr = new XMLHttpRequest();

	  xhr.open("get", `./include/map-table.html`, false);
	  xhr.send(null);
	  let mapRow_htmlStr = xhr.responseText
	
	  document.querySelector(".mapBox .mapConainer .mapTable-Container .customTable").innerHTML = ""
	
      xhr.open("get", `/users/recent_search`, false);
	  xhr.send(null);
	  console.log(xhr.responseText)
	  
	  if (xhr.responseText == null || xhr.responseText.length == 0) return
	  
	  const result = JSON.parse(xhr.responseText)
	  result.forEach(apt=>{
		  console.log(apt)
		  let row = document
	      .createRange()
	      .createContextualFragment(mapRow_htmlStr);
		  
		  //console.log(row.querySelectorAll(".customTable-row")[0].querySelector(".apartName").innerHTML)
		  //console.log(row.querySelectorAll(".customTable-row")[1].querySelector(".apartPrice").innerHTML)
		  //console.log(row.querySelectorAll(".customTable-row")[2].querySelector(".apartSize").innerHTML)
		  //console.log(row.querySelectorAll(".customTable-row")[3].querySelector(".apartDate").innerHTML)
		  row.querySelectorAll(".customTable-row")[0].querySelector(".apartName").innerHTML = apt.apt
		  row.querySelectorAll(".customTable-row")[1].querySelector(".apartPrice").innerHTML = apt.transactionAmount
		  row.querySelectorAll(".customTable-row")[2].querySelector(".apartSize").innerHTML = apt.area
		  row.querySelectorAll(".customTable-row")[3].querySelector(".apartDate").innerHTML = "0000.00.00"
		  
		  document.querySelector(".mapBox .mapConainer .mapTable-Container .customTable").appendChild(row)
	  })
}
	
const loginBtn = document.querySelector(".header_login_btn");
const loginDelelteBtn = document.querySelector(".login_modal_deleteBtn");
const loginModal = document.querySelector(".login_modal");

const signUp = document.querySelector(".header_signUp_btn");
const signUpModal = document.querySelector(".signUp");
const signUpDelelteBtn = document.querySelector(".signUp_modal_deleteBtn");

const signUpID = document.querySelector(".signUpID");
const signUpPw = document.querySelector(".signUpPw");
const signUpName = document.querySelector(".signUpName");
const signUpAdr = document.querySelector(".signUpAdr");
const signUPBTN = document.querySelector(".signUPBTN");

const InputId = document.querySelector(".InputId");
const InputPwd = document.querySelector(".InputPwd");

const mapDeleteBtn = document.querySelector(".mapDeleteBtn");
const mapContainer2 = document.querySelector(".mapContainer2");
const sidoBtn = document.querySelector(".sidoBtn");


let loginVal = false;

if(loginBtn){
	loginBtn.addEventListener("click", () => {
		  if (loginVal) {
		    loginBtn.innerText = "Login";
		    signUp.className = "header_nav_Btns header_signUp_btn";
		    loginVal = false;
		  } else {
		    loginModal.className = "login_modal show";
		  }
		});
}

loginDelelteBtn.addEventListener("click", () => {
  loginModal.className = "login_modal";
});

if(signUp){
	signUp.addEventListener("click", () => {
		  signUpModal.className = "signUp show2";
		});
}

signUpDelelteBtn.addEventListener("click", () => {
  signUpModal.className = "signUp";
});

signUPBTN.addEventListener("click", () => {
  const id = signUpID.value;
  const pwd = signUpPw.value;
  const name = signUpName.value;
  const adr = signUpAdr.value;

  const user = { id: id, pwd: pwd, name: name, adr: adr };
  
  if (id == "" || pwd == "" || name == "" || adr == "") { 
    alert("값을 정확히 기입하세요!");
  } else {
    signUpModal.className = "signUp";
    signUpID.value = "";
    signUpPw.value = "";
    signUpName.value = "";
    signUpAdr.value = "";
    
  }
});



sidoBtn.addEventListener("click", () => {
  mapContainer2.className = "mapContainer2 show3";
});

mapDeleteBtn.addEventListener("click", () => {
  mapContainer2.className = "signUp";
});

let date = new Date();

let url = location.href;
let getParams = url.slice(url.indexOf("?") + 1, url.length).split("&");

// 시도가 바뀌면 구군정보 얻기.
document.querySelector("#sido").addEventListener("change", function () {
  if (this[this.selectedIndex].value) {
    let regcode = this[this.selectedIndex].value.substr(0, 2) + "*00000";
    sendRequest("gugun", regcode);
  } else {
    initOption("gugun");
    initOption("dong");
  }
});

// 구군이 바뀌면 동정보 얻기.
document.querySelector("#gugun").addEventListener("change", function () {
  if (this[this.selectedIndex].value) {
    let regcode = this[this.selectedIndex].value.substr(0, 5) + "*";
    sendRequest("dong", regcode);
  } else {
    initOption("dong");
  }
});

function sendRequest(selid, regcode) {
  const url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
  let params = "regcode_pattern=" + regcode + "&is_ignore_zero=true";
  
  let xhr = new XMLHttpRequest();

  xhr.open(
    "get",
    
    `${url}?${params}`,
    false
  );
  xhr.send(null);
  
  addOption(selid, JSON.parse(xhr.responseText))
}

function addOption(selid, data) {
  let opt = ``;
  initOption(selid);
  switch (selid) {
    case "sido":
      opt += `<option value="">시도선택</option>`;
      data.regcodes.forEach(function (regcode) {
        opt += `
            <option value="${regcode.code}">${regcode.name}</option>
            `;
      });
      break;
    case "gugun":
      opt += `<option value="">구군선택</option>`;
      for (let i = 0; i < data.regcodes.length; i++) {
        if (i != data.regcodes.length - 1) {
          if (
            data.regcodes[i].name.split(" ")[1] ==
              data.regcodes[i + 1].name.split(" ")[1] &&
            data.regcodes[i].name.split(" ").length !=
              data.regcodes[i + 1].name.split(" ").length
          ) {
            data.regcodes.splice(i, 1);
            i--;
          }
        }
      }
      let name = "";
      data.regcodes.forEach(function (regcode) {
        if (regcode.name.split(" ").length == 2)
          name = regcode.name.split(" ")[1];
        else
          name = regcode.name.split(" ")[1] + " " + regcode.name.split(" ")[2];
        opt += `
            <option value="${regcode.code}">${name}</option>
            `;
      });
      break;
    case "dong":
      opt += `<option value="">동선택</option>`;
      let idx = 2;
      data.regcodes.forEach(function (regcode) {
        if (regcode.name.split(" ").length != 3) idx = 3;
        opt += `
            <option value="${regcode.code}">${
          regcode.name.split(" ")[idx]
        }</option>
            `;
      });
  }
  document.querySelector(`#${selid}`).innerHTML = opt;
}

function initOption(selid) {
  let options = document.querySelector(`#${selid}`);
  options.length = 0;
  // let len = options.length;
  // for (let i = len - 1; i >= 0; i--) {
  // options.remove(i);
  // }
}

// /////////////////////// 아파트 매매 정보 /////////////////////////
let detailAddress;
let aptName;
let address = ``;
let m = date.getMonth() + 1;
let idx;

let mapContainer;
let map;
let geocoder;

document
  .querySelector("#list-btn")
  .addEventListener("click", async function () {
    detailAddress = [];
    aptName = [];
    address = ``;
    idx = 0;

    (mapContainer = document.getElementById("map")), // 지도를 표시할 div
      (mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3, // 지도의 확대 레벨
      });

    map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    geocoder = new kakao.maps.services.Geocoder();

    let sSel =
      document.querySelector("#sido").options[
        document.querySelector("#sido").selectedIndex
      ].text;
    let gSel =
      document.querySelector("#gugun").options[
        document.querySelector("#gugun").selectedIndex
      ].text;
    let dSel =
      document.querySelector("#dong").options[
        document.querySelector("#dong").selectedIndex
      ].text;

    if (sSel == "시도선택") {
      sSel = "";
    }
    if (gSel == "구군선택") {
      gSel = "";
    }
    if (dSel == "동선택") {
      dSel = "";
    }
    address += sSel + " " + gSel;

    let sVal =
      document.querySelector("#sido").options[
        document.querySelector("#sido").selectedIndex
      ].value;
    let gVal =
      document.querySelector("#gugun").options[
        document.querySelector("#gugun").selectedIndex
      ].value;
    let dVal =
      document.querySelector("#dong").options[
        document.querySelector("#dong").selectedIndex
      ].innerHTML;
    
    let result = null;

    await fetch(`./getApartment?sVal=${sVal?sVal:null }&gVal=${gVal?gVal:null }&dVal=${dVal!="동선택"?dVal:null }`)
    .then((response) => response.text())
    .then((data) => {
    	console.log(data)
    	if (data == null || data.length < 1) return;
    	result = JSON.parse(data)
    });
    
    

    initTable();
    
    if (result == null)
    	return;
    
    makeList(result, address, dSel)
    
    makeMap();
    
    
    
  });

function makeList(data, address, dSel) {
	if (data.length < 1){
		document.querySelector(".apartment-table").classList.remove("apartment-table-active")
		return
	}
	
  document.querySelector(".apartment-table").classList.add("apartment-table-active")
  let tbody = document.querySelector("#aptlist");
  

  
  for (let i = 0;i < data.length;i++){
// if (" " + dSel != data[i].dong) continue;
	  
	// ********************* table data *****************************
	  
      let tr = document.createElement("tr");
      tr.id=`aptInfo${i}`;
      
      let nameTd = document.createElement("td");
      nameTd.appendChild(
        document.createTextNode(data[i].apt)
      );

      tr.appendChild(nameTd);

      let floorTd = document.createElement("td");
      floorTd.appendChild(
        document.createTextNode(data[i].floor)
      );
      tr.appendChild(floorTd);

      let areaTd = document.createElement("td");
      areaTd.appendChild(
        document.createTextNode(data[i].area)
      );
      tr.appendChild(areaTd);

      let dongTd = document.createElement("td");
      dongTd.appendChild(
        document.createTextNode(data[i].dong)
      );
      tr.appendChild(dongTd);

      let priceTd = document.createElement("td");
      priceTd.appendChild(
        document.createTextNode(
          data[i].transactionAmount + "만원"
        )
      );
      priceTd.classList.add("text-end");
      tr.appendChild(priceTd);

      tbody.appendChild(tr);
      
      
      // ********************* map data *****************************
      aptName[idx] = data[i].apt;
      detailAddress[idx++] = data[i].dong + " " + data[i].jibun;
  }
}

function makeMap(check) {
	  for (let i = 0; i < detailAddress.length; i++) {
		const td=document.querySelector(`#aptInfo${i}`);
		
	    let totalAd = address + detailAddress[i];
	    //console.log(totalAd);
	    // 주소로 좌표를 검색합니다
	    geocoder.addressSearch(totalAd, function (result, status) {
	      // 정상적으로 검색이 완료됐으면
	      if (status === kakao.maps.services.Status.OK) {
	    	td.setAttribute("data-y",result[0].y);
	    	td.setAttribute("data-x",result[0].x);
	        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
	        //console.log(coords);
	        
	        td.addEventListener("click",()=>{
	            mapLoc(td);
	        })
	        
	        // 결과값으로 받은 위치를 마커로 표시합니다
	        var marker = new kakao.maps.Marker({
	          map: map,
	          position: coords,
	        });

	        // 인포윈도우로 장소에 대한 설명을 표시합니다
	        var infowindow = new kakao.maps.InfoWindow({
	          content: `<div style="width:150px;text-align:center;padding:6px 0;">${aptName[i]}</div>`,
	        });
	        infowindow.open(map, marker);

	        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
	        map.setCenter(coords);
	      }
	    });
	  }
	}


function mapLoc(td){
	const coords=new kakao.maps.LatLng(parseFloat(td.dataset.y),parseFloat(td.dataset.x));
	console.log(coords);
	map.setCenter(coords);
}

function initTable() {
  let tbody = document.querySelector("#aptlist");
  tbody.innerHTML = ""
}
