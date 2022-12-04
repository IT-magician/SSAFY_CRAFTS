export default {
    template: `
    
    
    <div class="app-content home">


        <!--==================== DISCOVER ====================-->
        <section class="discover section" id="discover" style="padding-top:0;">
            <h2 class="section_title">
                Today's <br />
                Our recommendation place
            </h2>

            <div class="discover_container container swiper-container">
                <div class="swiper-wrapper">


                    <!--==================== DISCOVER 1 ====================-->
                    <div class="discover_card swiper-slide" v-for="(item,idx) in resultData">
                        <img :src="item.img" alt="" class="discover_img" />
                        <div class="discover_data">
                            <h2 class="discover_title">{{item.placeName}}</h2>
                            <span class="discover_description">{{item.placePos}}</span>
                        </div>
                    </div>








                </div>
            </div>
        <div class="swiper-pagination"></div>
        </section>


        <section class="place section" id="place">
        <h2 class="section_title">Our recommendation Places</h2>
    
        <div class="categories">
            <button type="button" class="button" data-sort="random">Shuffle</button>
        </div>
    
        <div class="place_container container grid">
            <!--==================== PLACES CARD 1 ====================-->
            <div class="place_card category-a" :data-order="idx" v-for="(item,idx) in resultData">
                <img :src="item.img" alt="" class="place_img" />
    
                <div class="place_content">
                    <span class="place_rating">
                        <i class="ri-star-line place_rating-icon"></i>
                        <span class="place_rating-number">4,8</span>
                    </span>
    
                    <div class="place_data">
                        <h3 class="place_title">{{item.placeName}}</h3>
                        <span class="place_subtitle">{{item.placePos}}</span>
                        <span class="place_price">category-a</span>
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

    </div>
      `,
    data() {
        return {
            jwtToken: null,           test_tmp: ['a','b','c'],

            resultData: [],
        }
    },
    created() {
        this.jwtToken = JSON.parse(sessionStorage.getItem("auth"))
        this.jwtToken = this.jwtToken.JWTtoken

        //   console.log(this.$route.params.userID)

        /*==================== SCROLL REVEAL ANIMATION ====================*/
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2800,
            // reset: true,
        })


        sr.reveal(`
       .discover_container`, { // , .experience_data, .experience_overlay, .place_card
            origin: 'top',
            interval: 100,
        })






        let xhr = new XMLHttpRequest()

        xhr.open("post","http://localhost:8091/building/get/random",false)
        xhr.setRequestHeader("Authorization", `Bearer ${this.jwtToken}`);
        xhr.send(null)

        // console.log(xhr.status, xhr.responseText)
        this.resultData = JSON.parse(xhr.responseText)


        const rootDir1 = "/assets/img/building/"
        const imgArr1 = ["b1.jpg","b2.jpg","b3.jpeg","b4.jpg","b5.jpg"]

        // console.log(Math.floor(Math.random() * imgArr1.length))
        for (let i = 0;i < this.resultData.length;i++){
            this.resultData[i].img = rootDir1 + imgArr1[Math.floor(Math.random() * imgArr1.length)]
            this.resultData[i].placeName = this.resultData[i].aptName
            this.resultData[i].placePos = `${this.resultData[i].sidoVal} ${this.resultData[i].gugunVal} ${this.resultData[i].aptDong} ${this.resultData[i].aptJibun}`
        }

console.log(this.resultData,this.resultData.length)
    },
    methods: {},
    mounted() {
        
    const mixer = mixitup('.place_container', {
        selectors: {
            target: '.place_card'
        },
        animation: {
            duration: 300
        },



        pagination: {
            limit: 6,
            // maintainActivePage: false,
            loop: true,
            hidePageListIfSinglePage: true,
            maxPagers: 5,
        },
        load: {
            page: 1 // load page 3 on instantiation
        },
    });
    },
};
