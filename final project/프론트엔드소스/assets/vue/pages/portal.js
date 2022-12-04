export default {
  template: `
    
    
  <div>
    

  <div class="app-container">
        <div class="sidebar">
            <div class="sidebar-header">
                <div class="app-icon">
                    <img src="/assets/img/favicon.png" alt="" srcset="">
                </div>
            </div>
            <ul class="sidebar-list">

            <li class="sidebar-list-item active">
            <router-link to="/portal/home">
                <i class="fa-solid fa-house text-icon"></i>
                <span>Home</span>
                </router-link>
        </li>

                <li class="sidebar-list-item">
                    <router-link to="/portal/explore">
                        <i class="fa-solid fa-magnifying-glass text-icon"></i>
                        <span>Explore</span>
                    </router-link>
                </li>

                <li class="sidebar-list-item">
                    <router-link to="/portal/house">
                        <i class="fa-regular fa-building text-icon"></i>
                        <span>Where </br> to be </br>my Home?</span>
                    </router-link>
                </li>


                <li class="sidebar-list-item tab">

                    <input type="checkbox" id="chck1">
                    <a>
                        <label for="chck1">

                            <i class="fa-regular fa-calendar-lines-pen text-icon"></i>
                            <span>Board</span>
                        </label>
                    </a>
                    <router-link to="/portal/board/list/all" class="sidebar-list-item  tab-content"><div >전체 목록</div></router-link>
                    <router-link to="/portal/board/list/explore" class="sidebar-list-item  tab-content"><div >'Explore' 목록</div></router-link>
                    <router-link to="/portal/board/list/house" class="sidebar-list-item  tab-content"><div >'Where </br> to be </br>my Home?' 목록</div></router-link>
                    <!-- <div class="tab-content">글쓰기</div>
                    <div class="tab-content">b</div> -->
                </li>

                <!--<li class="sidebar-list-item">
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-pie-chart">
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                            <path d="M22 12A10 10 0 0 0 12 2v10z" />
                        </svg>
                        <span>Statistics</span>
                    </a>
                </li>-->

            </ul>



            <div class="account-info">
                <div class="account-info-picture" @click="userInfo()">
                    <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt="Account">
                </div>
                <div class="account-info-name" @click="userInfo()">{{userName}}</div>
                <button class="account-info-logout" @click="logout()">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>





        </div>

        <router-view></router-view>
    </div>



  </div>
    `,
    data() {
        return {
            userName: null,
            userID: null,
        }
    },
  methods: {
    // closeWindow(){
    //     this.isWindowOpened = !this.isWindowOpened
    //     console.log("portal",this.isWindowOpened)
    // },
    userInfo(e) {
        this.$router.push(`/account/info/${this.userID}`)
    },
    logout(e) {
        sessionStorage.removeItem("auth")
        if (confirm("로그아웃 합니다."))
            this.$router.push(`/account/login`)

    },
  },
  mounted() {},
  created() {
    let auth = sessionStorage.getItem("auth")
    auth = JSON.parse(auth)
    console.log(auth)
    this.userName = auth.userName
    this.userID = auth.userID
//     // console.log(auth)
//     try {
//     } catch (error) {
//         // alert("로그아웃 되었습니다..")
//         this.$router.push(`/account/login`)
//     }
  },
};
