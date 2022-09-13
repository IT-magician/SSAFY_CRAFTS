const createSelectOptions = () => {
    let url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
    let regcode = "*00000000";
    // 전국 특별/광역시, 도
    // https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000
    $.ajax({
        url: url,
        type: "GET",
        data: {
            regcode_pattern: regcode
        },
        dataType: "json",
        success: function (response) {
            let code = ``;
            $.each(response.regcodes, function (i, regcode) {
                code += `
      <option value="${regcode.code}">${regcode.name}</option>
      `;
            });
            $("#sido").empty().append('<option value="">시도선택</option>').append(code);
        },
        error: function (xhr, status, msg) {
            console.log("상태값 : " + status + " Http에러메시지 : " + msg);
        }
    });

    $(document).on("change", "#sido", function () {
        regcode = $(this).val().substr(0, 2) + "*00000";
        $.ajax({
            url: url,
            type: "GET",
            data: {
                regcode_pattern: regcode,
                is_ignore_zero: true
            },
            dataType: "json",
            success: function (response) {
                let code = ``;
                $.each(response.regcodes, function (i, regcode) {
                    code += `
      <option value="${regcode.code}">${regcode.name.split(" ")[1]}</option>
      `;
                });
                $("#gugun").empty().append('<option value="">구군선택</option>').append(code);
            },
            error: function (xhr, status, msg) {
                console.log("상태값 : " + status + " Http에러메시지 : " + msg);
            }
        });
    });

    $(document).on("change", "#gugun", function () {
        regcode = $(this).val().substr(0, 4) + "*";
        console.log(regcode);
        $.ajax({
            url: url,
            type: "GET",
            data: {
                regcode_pattern: regcode,
                is_ignore_zero: true
            },
            dataType: "json",
            success: function (response) {
                let code = ``;
                $.each(response.regcodes, function (i, regcode) {
                    code += `
      <option value="${regcode.code}">${regcode.name.split(" ")[2]}</option>
      `;
                });
                $("#dong").empty().append('<option value="">동선택</option>').append(code);
            },
            error: function (xhr, status, msg) {
                console.log("상태값 : " + status + " Http에러메시지 : " + msg);
            }
        });
    });


    let curYear = new Date().getFullYear();
    // console.log(curYear);

    let tmp = document.createElement("option");

    for (let i = 0; i <= 30; i++) {
        tmp.value = tmp.innerHTML = curYear - i;
        document.querySelector("#year").innerHTML += tmp.outerHTML
    }


    for (let i = 12; i > 0; i--) {
        tmp.value = tmp.innerHTML = String(i).padStart(2, '0');
        document.querySelector("#month").innerHTML += tmp.outerHTML
    }
};


const getAPTList = async (lawdCD, dealYmd, boardtype,defaultUrl = "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?LAWD_CD=") => {
    const serviceKey = "KoHKDfRy7ikARry4tmUsUR40977GjgeRnIE6kdRYjsiueTVkBtpETT0ZKlqHYUH%2BPDUKt%2B4I8uym%2FO3LvuAbZA%3D%3D";
    let redirecURL // for 'https' protocol

    document.querySelector(".loading-container").style.display = "flex";
    document.querySelector(".loading-container .loading-card .percent .number h2").innerHTML = "다운로드 완료"

    const data = [];
    let limit = /*Infinity*/1, i = 1

    let percent = -1

    while(i <= Math.min(limit, 5)){
        if (window.location.protocol == "https:"){
            redirecURL = "https://proxy.cors.sh/"
            console.log("https프로토콜에 의해 proxy서버로 redirect후 xml을 받아옵니다.")
        }
        else
            redirecURL = ""
        
        const url = `${redirecURL}${defaultUrl}${lawdCD}&DEAL_YMD=${dealYmd}&serviceKey=${serviceKey}&pageNo=${i}`;
        
        
        await fetch(url)
        .then(response => response.text())
        .then(result => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(result, "application/xml");
            xml.querySelectorAll("item").forEach(item => {
                data.push(createApartDealDetail(item));
            });
            
            if (xml.getElementsByTagName("totalCount").length < 1) // 하루 허용 사용량 초과
            {
                alert("하루에 사용할 수 있는 xml 횟수를 초과하였습니다.")
                limit = 1
                i = limit + 100
                return
            }


            limit = xml.getElementsByTagName("totalCount")[0].childNodes[0].nodeValue

            if (percent != Math.floor(i/limit*100)){
                percent = Math.floor(i/limit*100)
                document.querySelector(".loading-container .loading-card .percent").style.setProperty('--num',Math.floor(i/limit*100))
                document.querySelector(".loading-container .loading-card .percent .number h2").innerHTML = Math.floor(i/limit*100)
            }

            i++

        })
        .catch(console.error);
    }
    // console.log(data)

    if (boardtype == "search") {
        getSearchTable(data);
    }

    document.querySelector(".loading-container").style.display = "none";

    return data;
};

const createApartDealDetail = item => {
    return {
        dealPrice: getContent(item, "거래금액") + "만원",
        buildAt: getContent(item, "건축년도"),
        dealYear: getContent(item, "년"),
        roadName: getContent(item, "도로명"),
        village: getContent(item, "법정동"),
        apartName: getContent(item, "아파트"),
        dealMonth: getContent(item, "월"),
        dealDay: getContent(item, "일"),
        area: getContent(item, "전용면적"),
        floor: getContent(item, "층"),
        jibun: getContent(item, "지번"),
        eubmyundongCode: getContent(item, "법정동읍면동코드")
    };
};

const getContent = (item, tagName) => {
    return item.querySelector(tagName).textContent.trim();
};


let sido = null;
let regCode = null;
let gugun = null;
let dongCode = null;
let dong = null;
let year = null;
let month = null;

function getSelects(par) {

    let sidoSel = par.querySelector("#sido");
    sido = sidoSel[sidoSel.selectedIndex].text;
    let gugunSel = par.querySelector("#gugun");
    regCode = gugunSel[gugunSel.selectedIndex].value.substr(0, 5);
    gugun = gugunSel[gugunSel.selectedIndex].innerHTML;
    let dongSel = par.querySelector("#dong");
    dong = dongSel[dongSel.selectedIndex].innerHTML
    dongCode = dongSel[dongSel.selectedIndex].value.substr(5);

    let yearBox = par.querySelector("#year")
    let monthBox = par.querySelector("#month")

    year = yearBox[yearBox.selectedIndex].value
    month = monthBox[monthBox.selectedIndex].value
}

const aptSearchBtnHandler = async () => {
    getSelects(document.querySelector(".Main .contents .searchHomeTable .selectboxes"))

    const data = await getAPTList(regCode, year + month, "search");
    const apts = [];

    for (let apt of data) {
        if (dongCode === "" || dongCode === apt.eubmyundongCode) {
            apts.push(apt);
        }
    }

    getSearchTable(apts);
};


const addressSearch = address => {
    return new Promise((resolve, reject) => {
        geocoder.addressSearch(address, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                resolve(result);
            } else {
                reject(status);
            }
        });
    });
};

const moveMap = latL => {
    return new Promise((resolve, reject) => {
        map.panTo(latL)

    });
};
const sizeupMap = sizeVal => {
    return new Promise((resolve, reject) => {
        map.setLevel(sizeVal)

    });
};

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function () {
        infowindow.close();
    };
}

async function moving(lat) {
    await moveMap(lat);
}

const markers = [];


const drawMarkers = async () => {
    getSelects(document.querySelector(".content .Main .contents .mapBox .selectboxes"))
    document.querySelector(".content .Main .contents .mapBox .mapConainer .mapTable-Container").style.opacity = "1"
    document.querySelector(".content .Main .contents .mapBox .mapConainer .mapTable-Container .map-dong").innerHTML = ""

    if (dong != "동선택")
        document.querySelector(".content .Main .contents .mapBox .mapConainer .mapTable-Container .map-dong").innerHTML = dong
    else if (gugun != "구군선택")
        document.querySelector(".content .Main .contents .mapBox .mapConainer .mapTable-Container .map-dong").innerHTML = gugun
    

    const data = await getAPTList(regCode, year + month, "Map");
    const apts = [];
    const positions = [];

    // 필요한 데이터를 필터링
    for (let i = 0; i < data.length; i++) {

        if (dongCode === "" || dongCode === data[i].eubmyundongCode) {
            let json = new Object()

            json.addrName = `${sido} ${gugun} ${data[i].village} ${data[i].jibun}`
            json.title = data[i].apartName
            json.data = data[i]

            json.geocoder = await addressSearch(json.addrName);

            positions.push(json)
        }
    }


    // gui에 등록
    fetch("./contents/map-table.html")
        .then((response) => response.text())
        .then((htmlStr) => {
            document.querySelector(".content .Main .contents .mapBox .mapConainer .mapTable-Container .customTable").innerHTML = ""


            for (let i = 0; i < positions.length; i++) {
                let frag = document.createRange().createContextualFragment(htmlStr);
                frag.querySelectorAll(".home .customTable-row")[0].querySelectorAll(".customTable-col")[1].innerHTML = positions[i].data.apartName
                frag.querySelectorAll(".home .customTable-row")[1].querySelectorAll(".customTable-col")[1].innerHTML = positions[i].data.dealPrice
                frag.querySelectorAll(".home .customTable-row")[2].querySelectorAll(".customTable-col")[1].innerHTML = positions[i].data.area.padStart(2, '0');
                frag.querySelectorAll(".home .customTable-row")[3].querySelectorAll(".customTable-col")[0].querySelector("span").innerHTML = `${positions[i].data.dealYear.padStart(2, '0')}.${positions[i].data.dealMonth.padStart(2, '0')}.${positions[i].data.dealDay.padStart(2, '0')}`


                // frag.querySelector(".home .latInfo").querySelector(".latY").innerHTML = positions[i].geocoder[0].address.y
                // frag.querySelector(".home").querySelector(".latInfo").querySelector(".latX").innerHTML = positions[i].geocoder[0].address.x
                frag.querySelector(".home").querySelector(".latInfo").querySelector(".idx").innerHTML = i

                mapTable.append(frag)
            }

            document.querySelectorAll(".content .Main .contents .mapBox .mapConainer .mapTable-Container .customTable .home").forEach(name => name.addEventListener('click', function (e) {
                const idx = this.querySelector(".latInfo").querySelector(".idx").innerHTML
                if (markers.length > 0) {
                    markers.forEach(name=>{
                        name.infowindow.close()
                    })
                    
    if (map.getLevel() > 5) {
        map.setLevel(4)
    }

                    recentSearched.push(positions[idx].data)

                    markers[idx].infowindow.open(map, markers[idx].marker);

                    // 지도 중심을 부드럽게 이동시킵니다
                    // 만약 이동할 거리가마 지도 화면보다 크면 부드러운 효과 없이 이동합니다
                    moving(new kakao.maps.LatLng(positions[idx].geocoder[0].address.y, positions[idx].geocoder[0].address.x))
                }
            }))

        })



    // marker
    while (markers.length > 0) {
        const tmp = markers.pop();
        tmp.marker.setMap(null);
        tmp.infowindow.setMap(null);
    }


    if (map.getLevel() > 7) {
        map.setLevel(7)
    }

    if (positions.length > 0) {
        for (var i = 0; i < positions.length; i++) {
            //마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(positions[i].geocoder[0].address.y, positions[i].geocoder[0].address.x), // 마커를 표시할 위치
                title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            });

            var iwContent = `<div style="padding:5px;min-height:80px">${positions[i].title} <br><a href="https://map.kakao.com/link/map/${positions[i].title},${positions[i].geocoder[0].address.y},${positions[i].geocoder[0].address.x}" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${positions[i].title},${positions[i].geocoder[0].address.y},${positions[i].geocoder[0].address.x}" style="color:blue" target="_blank">길찾기</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다


            // 인포윈도우를 생성하고 지도에 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                map: map, // 인포윈도우가 표시될 지도
                position: new kakao.maps.LatLng(positions[i].geocoder[0].address.y, positions[i].geocoder[0].address.x),
                content: iwContent,
                removable: true
            });


            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다 
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
            // kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            // kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));



            markers.push({
                marker,
                infowindow
            })

        }


        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가마 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        await moveMap(new kakao.maps.LatLng(positions[0].geocoder[0].address.y, positions[0].geocoder[0].address.x));
    }


}

function aptSearchBtnHandler2(e) {
    drawMarkers()

}

function aptSearchBtnHandler3(e) {
    drawMarkers()
}
