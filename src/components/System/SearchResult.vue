<template>
    <div class="search-result-block">
        <div class="img-container">
            <img :src="imageData"  />
            <div class="price-per-hr"> <span>$</span>200/hr</div>
        </div>
        <div class="desc-container">
            <h4>Large Showroom w/ Full Bar</h4>
            <p>The Delaney Rooftop</p>
            <div class="tag-row">
            <div class="tag">pet-friendly</div>
            <div class="tag">drinks available</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "SearchResultBlock",
        props: {
            imageUrl: String
        },
        data() {
            return {
                imageData: "https://images.placeholders.dev/170x156"
            }
        },
    }
</script>
<style lang="scss">
.search-result-block {
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: flex-start;
      width: 100%;
      max-width: 440px;
      height: max-content;
      margin-bottom: 20px;
      border: 1px #ccc solid;
      border-radius: 10px;
      
      .img-container {
        margin: 0;
        max-height: 100px;
        overflow: hidden;
        img {
            position: relative;
            object-fit: cover;
            min-height: inherit;
            width: inherit;
        }
        .price-per-hr {
          position: absolute;
          bottom: 5px;
          left: 90px;
          padding: 4px 11px 4px 11px;
          border-radius: 5px;
          background: white;
          font-weight: bold;
          font-size: .8rem;
        }
      }
      .desc-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        padding: 8px 16px 8px 8px;
        h4 {
          font-size: 0.9rem;
          text-align: start;
          margin: 0;  
        }
        p {
          text-align: start;
          font-size: 0.85rem;
          margin: 0;
        }
        .tag-row {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          margin: 0;
          padding-top: 10px;

          .tag {
            width: max-content;
            margin-right: 8px;
            padding: 2px 10px;
            background: #d9d9d9;
            text-transform: capitalize;
            font-size: 0.7rem;
            font-weight: bold;
          }
        }
      }
    }
</style>