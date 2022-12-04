<template>
    <div class="app-content home">
        <!--==================== DISCOVER ====================-->
        <section class="discover section" id="discover" style="padding-top:0;">
            <h2 class="section_title">
                Today's <br />
                Our recommendation categories
            </h2>

            <div class="discover_container container swiper-container">
                <div class="swiper-wrapper">
                    <!--==================== DISCOVER 2 ====================-->
                    <div class="discover_card swiper-slide">
                        <img src="assets/img/restaurants.jpg" alt="" class="discover_img" />
                        <div class="discover_data">
                            <h2 class="discover_title">Restaurants</h2>
                            <span class="discover_description">18,358 Views</span>
                        </div>
                    </div>
                    <!--==================== DISCOVER 1 ====================-->
                    <div class="discover_card swiper-slide">
                        <img src="assets/img/discover1.jpg" alt="" class="discover_img" />
                        <div class="discover_data">
                            <h2 class="discover_title">Beaches</h2>
                            <span class="discover_description">1,302 Views</span>
                        </div>
                    </div>

                    <!--==================== DISCOVER 3 ====================-->
                    <div class="discover_card swiper-slide">
                        <img src="assets/img/discover3.jpg" alt="" class="discover_img" />
                        <div class="discover_data">
                            <h2 class="discover_title">Walkways</h2>
                            <span class="discover_description">981,251 Views</span>
                        </div>
                    </div>
                </div>
            </div>
        <div class="swiper-pagination"></div>
        </section>

        <!--==================== EXPERIENCE ====================-->
        <section class="experience section" id="recommend">
            <h2 class="section_title">
                Today’s <br />
                our recommendation <br />
                place
            </h2>

            <div class="experience_container container grid">
                <div class="experience_content grid">
                    <div class="experience_data">
                        <h2 class="experience_number">20</h2>
                        <span class="experience_description">Year <br />
                            Experience</span>
                    </div>

                    <div class="experience_data">
                        <h2 class="experience_number">75</h2>
                        <span class="experience_description">Complete <br />
                            tours</span>
                    </div>

                    <div class="experience_data">
                        <h2 class="experience_number">650+</h2>
                        <span class="experience_description">Tourist <br />
                            Destination</span>
                    </div>
                </div>

                <div class="experience_img grid">
                    <div class="experience_overlay">
                        <img src="assets/img/experience1.jpg" alt="" class="experience_img-one" />
                    </div>

                    <div class="experience_overlay">
                        <img src="assets/img/experience2.jpg" alt="" class="experience_img-two" />
                    </div>
                </div>
            </div>
        </section>

        <!--==================== PLACES ====================-->
        <section class="place section" id="place">
            <h2 class="section_title">Our recommendation Places</h2>

            <div class="categories">
                <button type="button" class="button" data-filter="all">All</button>
                <button type="button" class="button" data-filter=".category-a">Category A</button>
                <button type="button" class="button" data-filter=".category-b">Category B</button>
                <button type="button" class="button" data-filter=".category-c">Category C</button>
                <button type="button" class="button" data-filter=".ABC">ABC</button>
                <button type="button" class="button" data-sort="random">Random</button>
            </div>

            <div class="place_container container grid">
                <!--==================== PLACES CARD 1 ====================-->
                <div class="place_card category-a" data-order="1">
                    <img src="assets/img/place1.jpg" alt="" class="place_img" />

                    <div class="place_content">
                        <span class="place_rating">
                            <i class="ri-star-line place_rating-icon"></i>
                            <span class="place_rating-number">4,8</span>
                        </span>

                        <div class="place_data">
                            <h3 class="place_title">Bali</h3>
                            <span class="place_subtitle">Indonesia</span>
                            <span class="place_price">category-a</span>
                        </div>
                    </div>

                    <button class="button button--flex place_button">
                        <i class="ri-arrow-right-line"></i>
                    </button>
                </div>

                <!--==================== PLACES CARD 2 ====================-->
                <div class="place_card category-b" data-order="2">
                    <img src="assets/img/place2.jpg" alt="" class="place_img" />

                    <div class="place_content">
                        <span class="place_rating">
                            <i class="ri-star-line place_rating-icon"></i>
                            <span class="place_rating-number">5,0</span>
                        </span>

                        <div class="place_data">
                            <h3 class="place_title">Bora Bora</h3>
                            <span class="place_subtitle">Polinesia</span>
                            <span class="place_price">category-b</span>
                        </div>
                    </div>

                    <button class="button button--flex place_button">
                        <i class="ri-arrow-right-line"></i>
                    </button>
                </div>

                <!--==================== PLACES CARD 3 ====================-->
                <div class="place_card category-c" data-order="3">
                    <img src="assets/img/place3.jpg" alt="" class="place_img" />

                    <div class="place_content">
                        <span class="place_rating">
                            <i class="ri-star-line place_rating-icon"></i>
                            <span class="place_rating-number">4,9</span>
                        </span>

                        <div class="place_data">
                            <h3 class="place_title">Hawaii</h3>
                            <span class="place_subtitle">EE.UU</span>
                            <span class="place_price">category-c</span>
                        </div>
                    </div>

                    <button class="button button--flex place_button">
                        <i class="ri-arrow-right-line"></i>
                    </button>
                </div>

                <!--==================== PLACES CARD 4 ====================-->
                <div class="place_card category-a" data-order="4">
                    <img src="assets/img/place4.jpg" alt="" class="place_img" />

                    <div class="place_content">
                        <span class="place_rating">
                            <i class="ri-star-line place_rating-icon"></i>
                            <span class="place_rating-number">4,8</span>
                        </span>

                        <div class="place_data">
                            <h3 class="place_title">Whitehaven</h3>
                            <span class="place_subtitle">Australia</span>
                            <span class="place_price">category-a</span>
                        </div>
                    </div>

                    <button class="button button--flex place_button">
                        <i class="ri-arrow-right-line"></i>
                    </button>
                </div>

                <!--==================== PLACES CARD 5 ====================-->
                <div class="place_card category-a" data-order="5">
                    <img src="assets/img/place5.jpg" alt="" class="place_img" />

                    <div class="place_content">
                        <span class="place_rating">
                            <i class="ri-star-line place_rating-icon"></i>
                            <span class="place_rating-number">4,8</span>
                        </span>

                        <div class="place_data">
                            <h3 class="place_title">Hvar</h3>
                            <span class="place_subtitle">Croacia</span>
                            <span class="place_price">category-a</span>
                        </div>
                    </div>

                    <button class="button button--flex place_button">
                        <i class="ri-arrow-right-line"></i>
                    </button>
                </div>

                <!--==================== PLACES CARD 6 ====================-->
                <div class="place_card category-a" data-order="6">
                    <img src="assets/img/place1.jpg" alt="" class="place_img" />

                    <div class="place_content">
                        <span class="place_rating">
                            <i class="ri-star-line place_rating-icon"></i>
                            <span class="place_rating-number">4,8</span>
                        </span>

                        <div class="place_data">
                            <h3 class="place_title">Hvar</h3>
                            <span class="place_subtitle">Croacia</span>
                            <span class="place_price">category-a</span>
                        </div>
                    </div>

                    <button class="button button--flex place_button">
                        <i class="ri-arrow-right-line"></i>
                    </button>
                </div>


                <!--==================== PLACES CARD 7 ====================-->
                <div class="place_card ABC" data-order="7">
                    <img src="assets/img/place1.jpg" alt="" class="place_img" />

                    <div class="place_content">
                        <span class="place_rating">
                            <i class="ri-star-line place_rating-icon"></i>
                            <span class="place_rating-number">4,8</span>
                        </span>

                        <div class="place_data">
                            <h3 class="place_title">Hvar</h3>
                            <span class="place_subtitle">Croacia</span>
                            <span class="place_price">ABC</span>
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
</template>

<script>
<!--=============== SCROLL REVEAL===============-->
<script src="https://unpkg.com/scrollreveal"></script>

<!--=============== SWIPER JS ===============-->
<script src="assets/js/swiper-bundle.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/mixitup/3.3.1/mixitup.min.js"
    integrity="sha512-nKZDK+ztK6Ug+2B6DZx+QtgeyAmo9YThZob8O3xgjqhw2IVQdAITFasl/jqbyDwclMkLXFOZRiytnUrXk/PM6A=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- mixitup -->
<script src="assets/js/mixitup-pagination.min.js"></script>



<script>
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
            el: '.swiper-pagination',
            clickable: true,
        },
    })

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
</script>
export default {

}
</script>

<style>

</style>