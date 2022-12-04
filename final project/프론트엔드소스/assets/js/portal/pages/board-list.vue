<template>
  <div>
    <div class="categories">
      <button type="button" class="button" data-filter="all">All</button>
      <button type="button" class="button" data-filter=".category-a">
        Category A
      </button>
      <button type="button" class="button" data-filter=".category-b">
        Category B
      </button>
      <button type="button" class="button" data-filter=".category-c">
        Category C
      </button>
      <button type="button" class="button" data-filter=".ABC">ABC</button>
      <button type="button" class="button" data-sort="random">Random</button>
    </div>

    <ul class="board-list">
      <li class="board-item">
        <div class="board-item-title">
          <div class="before"></div>
          <div class="content">
            여기가 공원 맛집입니다여기가 공원 맛집입니다여기가 공원
            맛집입니다여기가 공원 맛집입니다여기가 공원 맛집입니다여기가 공원
            맛집입니다.
          </div>
        </div>
        <div class="board-item-detail">
          <div class="board-item-detail-icon">
            <i class="fa-regular fa-bench-tree"></i>
          </div>
          <div class="board-item-detail-views">3,879</div>
        </div>
        <div class="board-item-place">
          <div class="board-item-place-name">서울숲</div>
          <div class="board-item-place-position">
            서울 성동구 성수동1가 678-1
          </div>
          <div class="gps">
            <div class="latY">32.12</div>
            <div class="latX">132.123</div>
          </div>
        </div>

        <div class="writer-name">aaa</div>
      </li>

    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>