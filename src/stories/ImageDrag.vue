<template>
    <div class="flex m-10">
      <draggable class="dragArea" :list="list" @change="log">
       
      <div class="drag-element" v-for="(item, index) in list" :key="index">
        <input type="file" @change="readFile(index)" ref="fileInputs" />
        <div v-if="item.url">
          <img  :src="item.url" alt="Uploaded Image" />
          <button @click="removeItem(index)">X</button>
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
    </div>
  </template> 
  <script>
    import { defineComponent } from 'vue'
    import { VueDraggableNext } from 'vue-draggable-next'


    export default defineComponent({
      
      components: {
        draggable: VueDraggableNext,
      },
      props: {
        placeholder: String,
        displayError: Boolean,
      },
      data() {
        return {
          enabled: true,
          list: [
            { id: 1, url: 'https://images.unsplash.com/photo-1569924995012-c4c706bfcd51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80' },
            { id: 2, url: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80' },
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
    .dragArea {
        display: flex;
        width: 100%;
        max-width: 950px;
        flex-wrap: wrap;
        .drag-element {
            position: relative;
            display: flex;
            margin: 8px;
            cursor: pointer;
            img {
                height: 125px;
                width: 220px;
                border-radius: 5px;
                object-fit: cover;
                &:hover {
                    opacity: 0.8;
                }
            }
            button, p {
                position: absolute;
                top: -5px;
                left: -5px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 2px solid white;
                background: #e4959e;
                text-align: center;
                font-weight: 700;
                font-size: 0.8rem;
                line-height: 1.33rem;
                color: #100409;
                user-select: none;
            }

            input {
                border: 2px solid salmon;
                position: absolute;  
                left:0px;
                width: 100%;
                height: calc(100% - 5px);
                cursor: pointer;
                opacity: 0;
            }   
            button {
              z-index: 99;
              opacity: 0;
              &:hover {
                opacity: 1;
                transform: scale(1.33);
                background: #FF4D4D;              }
            }
        }
    }
</style>