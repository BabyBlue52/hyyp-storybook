<template>
      <draggable class="dragArea" :list="list" @change="log">
      <div class="drag-element" v-for="(item, index) in list" :key="index">
        <input type="file" @change="readFile(index)" ref="fileInputs" />
        
        <div v-if="item.url">
          <h4>Replace</h4>
          <img  :src="item.url" alt="Uploaded Image" />
          <button @click="removeItem(index)"><Link text="Remove Item"/></button>
          <p>{{ index +1 }}</p>
        </div>
        <div v-else>
          
          <!-- Placeholder content -->
          <svg width="220" height="125" viewBox="0 0 220 125" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="220" height="125" rx="5" fill="white"/>
            <rect width="220" height="125" rx="5" fill="#DCE6F2"/>
            <rect x="1" y="1" width="218" height="123" rx="4" stroke="#37515F" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="14 14"/>
            <g clip-path="url(#clip0_659_24276)">
            <path d="M120.56 61H111.76V51H108.24V61H99.4399V65H108.24V75H111.76V65H120.56V61Z" fill="#37515F"/>
            </g>
            <defs>
            <clipPath id="clip0_659_24276">
            <rect width="21.12" height="24" fill="white" transform="translate(99.4399 51)"/>
            </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      </draggable>
  </template> 
  <script>
    import { defineComponent } from 'vue'
    import { VueDraggableNext } from 'vue-draggable-next'
    import Link from '@/components/UI/Link.vue';

    export default defineComponent({
      components: {
        draggable: VueDraggableNext,
        Link
      },
      props: {
        placeholder: String,
        displayError: Boolean,
      },
      data() {
        return {
          enabled: true,
          list: [
            { id: 1, url: '' },
            { id: 2, url: '' },
            { id: 3, url: '' },
            { id: 4, url: '' },
          ],
          dragging: false,
        }
      },
      methods: {
        log(event) {
          console.log(event)
        },
        async readFile(index) {
          const inputElement = this.$refs.fileInputs[index];
          const file = inputElement.files[0];

          // Check if a file was selected
          if (!file) {
            // Handle canceled upload
            this.list[index] = { file, url: null };
            return;
          }


          const imageURL = URL.createObjectURL(file);

          let size = file.size;
          let maxSize = 64000000; // Limit size to 8MB
          let extn = file.type.split('/')[1];
          let valid = ["png", "jpg", "jpeg"];

          if (valid.includes(extn) && size < maxSize) {
            // Update existing data at the specified index
            this.list[index] = { file, url: imageURL };
          } else {
            // Show placeholder content
            this.list[index] = { file, url: null };
          }
        },
        removeItem(index) {
          this.list[index].url = ''
        }
      },
    })
  </script>
<style scoped lang="scss">
@use "@/assets/variables.scss" as *;
    .dragArea {
        display: flex;
        justify-content: flex-start;
        width: calc(100% + 20px);
        // max-width: 950px;
        flex-wrap: wrap;
        gap: 8px 0px;
        margin-top: 20px;
        .drag-element {
            position: relative;
            display: flex;
            max-width: 220px;
            margin: 0 12px;
            margin-bottom: 30px;
            cursor: move;
            img {
                height: 125px;
                width: 200px;
                border-radius: 5px;
                object-fit: cover;
                &:hover {
                    opacity: 0.8;
                }
            }
            h4 {
              z-index: 2;
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              top: 0;
              width: 100%;
              height: 100%;
              text-align: center;
              background: rgba(255,255,255,0.75);
              opacity: 0;
              transform: 200ms ease-in-out all;
              cursor: pointer;
              user-select: none;
            }
            p {
                position: absolute;
                top: -5px;
                left: -5px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 2px solid white;
                background: $primary;
                text-align: center;
                font-weight: 700;
                font-size: $paragraph;
                line-height: 1.33rem;
                color: $black;
                user-select: none;
                z-index: 4;
            }
            input {
                border: 2px solid salmon;
                position: absolute;  
                left:0px;
                width: 100%;
                height: calc(100% - 5px);
                cursor: pointer;
                opacity: 0;
                z-index: 3;
                
            }   
            button {
              position: absolute;
              top: calc(100% - 5px);
              left: -5px;
            } 
            &:hover {
                h4 {
                  opacity: 0.8;
                  transform: 200ms ease-in-out all;
                }
              }
        }
    }
    
</style>