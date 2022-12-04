export default {
  template: `
<div>

<header class="header" id="header">
  <nav class="nav container">
    <a href="#" class="nav_logo">Travel</a>

    <div class="nav_menu" id="nav-menu">
      <ul class="nav_list">
        <li class="nav_item">
          <a href="#home" class="nav_link">Home</a>
        <li class="nav_item">
          <a href="#discover" class="nav_link">Discover</a>
        </li>
        </li>
        <li class="nav_item">
          <a href="#place" class="nav_link">Recommend</a>
        </li>
      </ul>


      <i class="ri-close-line nav_close" id="nav-close"></i>
    </div>

    <div class="nav_toggle" id="nav-toggle">
      <i class="ri-function-line"></i>
    </div>
  </nav>
</header>


<main class="main">
  <!--==================== HOME ====================-->
  <section class="home" id="home">
    <img src="assets/img/home1.jpg" alt="" class="home_img" />

    <div class="home_container container grid">
      <div class="home_data">
        <span class="home_data-subtitle">Discover your place</span>
        <h1 class="home_data-title">
          Explore <br />The Best
          <b>fit <br />
            Places</b>
        </h1>
        <router-link to="/portal/home" class="button">Go Portal</router-link>
      </div>

      <div class="home_social">
        <a href="https://www.facebook.com/" target="_blank" class="home_social-link">
          <i class="ri-facebook-box-fill"></i>
        </a>
        <a href="https://www.instagram.com/" target="_blank" class="home_social-link">
          <i class="ri-instagram-fill"></i>
        </a>
        <a href="https://twitter.com/" target="_blank" class="home_social-link">
          <i class="ri-twitter-fill"></i>
        </a>
      </div>

    </div>
  </section>

  <!--==================== DISCOVER ====================-->
  <section class="discover section" id="discover">
    <h2 class="section_title">
      Discover<br /> your <br />
      attractive place
    </h2>

    <div class="discover_container container swiper-container">
      <div class="swiper-wrapper">
        <!--==================== DISCOVER 2 ====================-->
        <div class="discover_card swiper-slide">
          <img src="assets/img/lotte.jpg" alt="" class="discover_img" />
          <div class="discover_data">
            <h2 class="discover_title">롯데타워</h2>
            <span class="discover_description">서울특별시 송파구 올림픽로 300</span>
          </div>
        </div>
        <!--==================== DISCOVER 1 ====================-->
        <div class="discover_card swiper-slide">
          <img src="assets/img/seoul_park.jpg" alt="" class="discover_img" />
          <div class="discover_data">
            <h2 class="discover_title">서울숲 공원</h2>
            <span class="discover_description">서울특별시 성동구 뚝섬로 273</span>
          </div>
        </div>

        <!--==================== DISCOVER 3 ====================-->
        <div class="discover_card swiper-slide">
          <img src="assets/img/jai.jpg" alt="" class="discover_img" />
          <div class="discover_data">
            <h2 class="discover_title">잠원동 자이 아파트</h2>
            <span class="discover_description">서울특별시 서초구 잠원로 60</span>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </section>


  <!--==================== PLACES ====================-->
  <section class="place section" id="place">
    <h2 class="section_title">Choose Your Place</h2>

    <div class="categories">
      <button type="button" class="button" data-filter="all">All</button>
      <button type="button" class="button" data-filter=".category-a">공원</button>
      <button type="button" class="button" data-filter=".category-b">카페</button>
      <button type="button" class="button" data-filter=".category-c">아파트</button>
      <button type="button" class="button" data-sort="random">Shuffle</button>
    </div>

    <div class="place_container container grid">
      <!--==================== PLACES CARD 1 ====================-->
      <div class="place_card category-b" data-order="1">
        <img src="assets/img/cafe1.jpg" alt="" class="place_img" />

        <div class="place_content">
          <span class="place_rating">
            <i class="ri-star-line place_rating-icon"></i>
            <span class="place_rating-number"></span>
          </span>

          <div class="place_data">
            <h3 class="place_title">로우커피스탠드</h3>
            <span class="place_subtitle">서울 성동구 왕십리로1234길 28-2 1층</span>
            <span class="place_price">북카페</span>
          </div>
        </div>

        <button class="button button--flex place_button">
          <i class="ri-arrow-right-line"></i>
        </button>
      </div>

      <!--==================== PLACES CARD 2 ====================-->
      <div class="place_card category-b" data-order="2">
        <img src="assets/img/cafe2.jpg" alt="" class="place_img" />

        <div class="place_content">
          <span class="place_rating">
            <i class="ri-star-line place_rating-icon"></i>
            <span class="place_rating-number"></span>
          </span>

          <div class="place_data">
            <h3 class="place_title">어라운드데이</h3>
            <span class="place_subtitle">서울 성동구 서울숲2길</br> 24-1</span>
            <span class="place_price">카페</span>
          </div>
        </div>

      </div>

      <!--==================== PLACES CARD 3 ====================-->
      <div class="place_card category-c" data-order="3">
        <img src="assets/img/cafe3.jpeg" alt="" class="place_img" />

        <div class="place_content">
          <span class="place_rating">
            <i class="ri-star-line place_rating-icon"></i>
            <span class="place_rating-number"></span>
          </span>

          <div class="place_data">
            <h3 class="place_title">윈터커피로스터스</h3>
            <span class="place_subtitle">대전 광역시 유성구 봉명동 1234</span>
            <span class="place_price">북카페</span>
          </div>
        </div>

        <button class="button button--flex place_button">
          <i class="ri-arrow-right-line"></i>
        </button>
      </div>

      <!--==================== PLACES CARD 4 ====================-->
      <div class="place_card category-a" data-order="4">
        <img src="assets/img/road1.jpg" alt="" class="place_img" />

        <div class="place_content">
          <span class="place_rating">
            <i class="ri-star-line place_rating-icon"></i>
            <span class="place_rating-number"></span>
          </span>

          <div class="place_data">
            <h3 class="place_title">자유로</h3>
            <span class="place_subtitle">ooo시 ooo구 ooo동</span>
            <span class="place_price">공원</span>
          </div>
        </div>

        <button class="button button--flex place_button">
          <i class="ri-arrow-right-line"></i>
        </button>
      </div>

      <!--==================== PLACES CARD 5 ====================-->
      <div class="place_card category-a" data-order="5">
        <img src="assets/img/trailmil.jpg" alt="" class="place_img" />

        <div class="place_content">
          <span class="place_rating">
            <i class="ri-star-line place_rating-icon"></i>
            <span class="place_rating-number"></span>
          </span>

          <div class="place_data">
            <h3 class="place_title">서울숲</h3>
            <span class="place_subtitle">ooo시 ooo구 ooo동</span>
            <span class="place_price">공원</span>
          </div>
        </div>

        <button class="button button--flex place_button">
          <i class="ri-arrow-right-line"></i>
        </button>
      </div>

      <!--==================== PLACES CARD 6 ====================-->
      <div class="place_card category-a" data-order="6">
        <img src="assets/img/park.jpg" alt="" class="place_img" />

        <div class="place_content">
          <span class="place_rating">
            <i class="ri-star-line place_rating-icon"></i>
            <span class="place_rating-number"></span>
          </span>

          <div class="place_data">
            <h3 class="place_title">한강공원</h3>
            <span class="place_subtitle">ooo시 ooo구 ooo동</span>
            <span class="place_price">공원</span>
          </div>
        </div>

        <button class="button button--flex place_button">
          <i class="ri-arrow-right-line"></i>
        </button>
      </div>


      <!--==================== PLACES CARD 7 ====================-->
      <div class="place_card ABC" data-order="7">
        <img src="assets/img/apartment.png" alt="" class="place_img" />

        <div class="place_content">
          <span class="place_rating">
            <i class="ri-star-line place_rating-icon"></i>
            <span class="place_rating-number"></span>
          </span>

          <div class="place_data">
            <h3 class="place_title">자이 아파트</h3>
            <span class="place_subtitle">대전 중구 충무로107번길 100</span>
            <span class="place_price">아파트</span>
          </div>
        </div>

        <button class="button button--flex place_button">
          <i class="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>

    <div class="mixitup-page-list"></div>
    <!-- <div class="mixitup-page-stats"></div> -->
  </section>
</main>
<!--==================== FOOTER ====================-->
<footer class="footer section">
  <div class="footer_container container grid">
    <div class="footer_content grid">
      <div class="footer_data">
        <h3 class="footer_title">Travel</h3>
        <p class="footer_description">
          Travel you choose the
          destination ,  <br />we offer you <br />the awesome
          experience.
        </p>
        <div>
          <a href="https://www.facebook.com/" target="_blank" class="footer_social">
            <i class="ri-facebook-box-fill"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" class="footer_social">
            <i class="ri-twitter-fill"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" class="footer_social">
            <i class="ri-instagram-fill"></i>
          </a>
          <a href="https://www.youtube.com/" target="_blank" class="footer_social">
            <i class="ri-youtube-fill"></i>
          </a>
        </div>
      </div>

      <div class="footer_data">
        <h3 class="footer_subtitle">About</h3>
        <ul>
          <li class="footer_item">
            <a href="" class="footer_link" onclick="alert('대전 6반 김태훈, 조용관입니다.')">About Us</a>
          </li>
        </ul>
      </div>

      <div class="footer_data">
        <h3 class="footer_subtitle">서비스</h3>
        <ul>
          <li class="footer_item">
            <a href="" class="footer_link">장소 추천 서비스</a>
          </li>
          <li class="footer_item">
            <a href="" class="footer_link">공원 검색 서비스</a>
          </li>
          <li class="footer_item">
            <a href="" class="footer_link">건물 매매 정보 서비스</a>
          </li>
          
          <li class="footer_item">
            <a href="" class="footer_link">장소 리뷰 게시판</a>
          </li>
        </ul>
      </div>

      <div class="footer_data">
        <h3 class="footer_subtitle">Support</h3>
        <ul>
          <li class="footer_item">
            <a href="" class="footer_link" onclick="alert('Coming Soon')">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer_rights">
      <p class="footer_copy">&#169; 2022. All rigths reserved.</p>
      <div class="footer_terms">
        <a href="#" class="footer_terms-link">Terms & Agreements</a>
        <a href="#" class="footer_terms-link">Privacy Policy</a>
      </div>
    </div>
  </div>
</footer>



</div>
    `,

  created() {











    // let xhr = new XMLHttpRequest()
    // let form_data = new FormData()
    //                 // ================== authenticate(JWT Token 발급) ===========================
    //                 xhr.open("post", "http://localhost:8091/authenticate", false);
    //                 form_data.append("userID", "ssafy");
    //                 form_data.append("password", "ssafy");
    //                 xhr.send(form_data);


    //                 // console.log(xhr.status, xhr.responseText);
    //                 const JWTtoken = xhr.responseText;
    //                 // ===================***********************************=========================


    //                 // ============================= 사용자 정보 발급 =============================
    //                 xhr.open("post", "http://localhost:8091/member/get", false);
    //                 xhr.setRequestHeader("Authorization", `Bearer ${JWTtoken}`);
    //                 form_data = new FormData();
    //                 form_data.append("userID", "ssafy");
    //                 xhr.send(form_data);
    //                 // console.log(xhr.status, xhr.responseText);
    //                 const auth = JSON.parse(xhr.responseText)
    //                 // ===================***********************************=========================

    //                 // =================================== 세션 저장 ===================================
    //                 auth.JWTtoken = JWTtoken
    //                 auth.userPW = null
    //                 auth.userAddr = null
    //                 sessionStorage.setItem("auth", JSON.stringify(auth));
    //                 // ======================***********************************=========================
// console.log(auth,"index,js")
// xhr.open("post","http://localhost:8091/building/get?gVal=11110&sidoVal=서울특별시&gugunVal=종로구",false)
// xhr.setRequestHeader("Authorization", `Bearer ${JWTtoken}`);
// xhr.send(null)
// console.log(sessionStorage.getItem("auth"))


// sessionStorage.removeItem("auth")
  },
  mounted() {
    function scrollHeader() {
      const header = document.getElementById("header");
      // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
      if (this.scrollY >= 100) header.classList.add("scroll-header");
      else header.classList.remove("scroll-header");
    }
    window.addEventListener("scroll", scrollHeader);
    /*==================== SWIPER DISCOVER ====================*/
    let swiper = new Swiper(".discover_container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      spaceBetween: 32,
      coverflowEffect: {
        rotate: 0,
      },

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    /*==================== SCROLL REVEAL ANIMATION ====================*/
    const sr = ScrollReveal({
      distance: "60px",
      duration: 2800,
      // reset: true,
    });

    sr.reveal(
      `.home_data, .home_social-link, .home_info,
           .discover_container,
           .place_card,
           .sponsor_content,
           .footer_data, .footer_rights`,
      {
        origin: "top",
        interval: 100,
      }
    );

    sr.reveal(
      `.about_data,
           .subscribe_description`,
      {
        origin: "left",
      }
    );

    sr.reveal(
      `.about_img-overlay,
           .subscribe_form`,
      {
        origin: "right",
        interval: 100,
      }
    );

    const mixer = mixitup(".place_container", {
      selectors: {
        target: ".place_card",
      },
      animation: {
        duration: 300,
      },

      pagination: {
        limit: 6,
        // maintainActivePage: false,
        loop: true,
        hidePageListIfSinglePage: true,
        maxPagers: 5,
      },
      load: {
        page: 1, // load page 3 on instantiation
      },
    });
  },
};
