let lats_arr = null

function loadMap() {
    mapContainer = document.querySelector('#map'), // 지도를 표시할 div 
    

        mapOption = {
            center: new kakao.maps.LatLng(36.3503849976553, 127.384633005948), // 지도의 중심좌표
            // level: 6 // 지도의 확대 레벨
            level: 13
        };

    // 지도를 생성합니다    
    map = new kakao.maps.Map(mapContainer, mapOption);
}