<template>
    <div v-if="isModalOpen">
        <ShareLinkModal/>
    </div>
    <div class="d-flex">
        <div class="last-time">
            <p>
                <!-- Should pe pulled from db -->
                Last Synced:<span>{{ lastUpdated }}</span>
            </p>
        </div>
        <div class="wrapper">
            <!-- Sync -->
            <button class="icon-btn">
            <v-icon icon="mdi-cloud-sync-outline" />
            <p>Sync</p>
            </button>
    
            <!-- Share -->
            <button class="icon-btn" @click="$event => isModalOpen = !isModalOpen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 88.1 88.1"
              style="enable-background: new 0 0 88.1 88.1"
              xml:space="preserve"
            >
              <g id="_x37_7_Essential_Icons_58_">
                <path
                  id="Share"
                  d="M69.05,58.1c-4.8,0-9.1,2.3-11.8,5.8l-24.3-14.1c1.5-3.7,1.5-7.8,0-11.5l24.3-14.1c2.7,3.5,7,5.8,11.8,5.8   c8.3,0,15-6.7,15-15s-6.7-15-15-15s-15,6.7-15,15c0,2,0.4,4,1.1,5.7l-24.3,14.2c-2.8-3.5-7-5.8-11.8-5.8c-8.3,0-15,6.7-15,15   s6.7,15,15,15c4.8,0,9.1-2.3,11.8-5.8l24.3,14.1c-0.7,1.7-1.1,3.7-1.1,5.7c0,8.3,6.7,15,15,15s15-6.7,15-15S77.35,58.1,69.05,58.1z    M69.05,4.1c6.1,0,11,4.9,11,11s-4.9,11-11,11c-6.1,0-11-4.9-11-11S62.95,4.1,69.05,4.1z M19.05,55.1c-6.1,0-11-4.9-11-11   s4.9-11,11-11s11,4.9,11,11S25.15,55.1,19.05,55.1z M69.05,84.1c-6.1,0-11-4.9-11-11s4.9-11,11-11c6.1,0,11,4.9,11,11   S75.15,84.1,69.05,84.1z"
                />
              </g>
            </svg>
            <p>Share</p>
          </button>
    
            <!-- Settings -->
            <button class="icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Livello 1"
              id="Livello_1"
              viewBox="0 0 128 128"
            >
              <title />
              <path
                d="M64,39A25,25,0,1,0,89,64,25,25,0,0,0,64,39Zm0,44A19,19,0,1,1,83,64,19,19,0,0,1,64,83Z"
              />
              <path
                d="M121,48h-8.93a1,1,0,0,1-.94-.68,49.9,49.9,0,0,0-2-4.85,1,1,0,0,1,.18-1.15L115.62,35a7,7,0,0,0,0-9.9L102.89,12.38a7,7,0,0,0-9.9,0l-6.31,6.31a1,1,0,0,1-1.15.18,49.76,49.76,0,0,0-4.85-2,1,1,0,0,1-.68-.94V7a7,7,0,0,0-7-7H55a7,7,0,0,0-7,7v8.93a1,1,0,0,1-.68.94,49.9,49.9,0,0,0-4.85,2,1,1,0,0,1-1.15-.18L35,12.38a7,7,0,0,0-9.9,0L12.38,25.11a7,7,0,0,0,0,9.9l6.31,6.31a1,1,0,0,1,.18,1.15,49.76,49.76,0,0,0-2,4.85,1,1,0,0,1-.94.68H7a7,7,0,0,0-7,7V73a7,7,0,0,0,7,7h8.93a1,1,0,0,1,.94.68,49.9,49.9,0,0,0,2,4.85,1,1,0,0,1-.18,1.15L12.38,93a7,7,0,0,0,0,9.9l12.73,12.73a7,7,0,0,0,9.9,0l6.31-6.31a1,1,0,0,1,1.15-.18,49.76,49.76,0,0,0,4.85,2,1,1,0,0,1,.68.94V121a7,7,0,0,0,7,7H73a7,7,0,0,0,7-7v-8.93a1,1,0,0,1,.68-.94,49.9,49.9,0,0,0,4.85-2,1,1,0,0,1,1.15.18L93,115.62a7,7,0,0,0,9.9,0l12.73-12.73a7,7,0,0,0,0-9.9l-6.31-6.31a1,1,0,0,1-.18-1.15,49.76,49.76,0,0,0,2-4.85,1,1,0,0,1,.94-.68H121a7,7,0,0,0,7-7V55A7,7,0,0,0,121,48Zm1,25a1,1,0,0,1-1,1h-8.93a7,7,0,0,0-6.6,4.69,43.9,43.9,0,0,1-1.76,4.26,7,7,0,0,0,1.35,8l6.31,6.31a1,1,0,0,1,0,1.41L98.65,111.38a1,1,0,0,1-1.41,0l-6.31-6.31a7,7,0,0,0-8-1.35,43.88,43.88,0,0,1-4.27,1.76,7,7,0,0,0-4.68,6.6V121a1,1,0,0,1-1,1H55a1,1,0,0,1-1-1v-8.93a7,7,0,0,0-4.69-6.6,43.9,43.9,0,0,1-4.26-1.76,7,7,0,0,0-8,1.35l-6.31,6.31a1,1,0,0,1-1.41,0L16.62,98.65a1,1,0,0,1,0-1.41l6.31-6.31a7,7,0,0,0,1.35-8,43.88,43.88,0,0,1-1.76-4.27A7,7,0,0,0,15.93,74H7a1,1,0,0,1-1-1V55a1,1,0,0,1,1-1h8.93a7,7,0,0,0,6.6-4.69,43.9,43.9,0,0,1,1.76-4.26,7,7,0,0,0-1.35-8l-6.31-6.31a1,1,0,0,1,0-1.41L29.35,16.62a1,1,0,0,1,1.41,0l6.31,6.31a7,7,0,0,0,8,1.35,43.88,43.88,0,0,1,4.27-1.76A7,7,0,0,0,54,15.93V7a1,1,0,0,1,1-1H73a1,1,0,0,1,1,1v8.93a7,7,0,0,0,4.69,6.6,43.9,43.9,0,0,1,4.26,1.76,7,7,0,0,0,8-1.35l6.31-6.31a1,1,0,0,1,1.41,0l12.73,12.73a1,1,0,0,1,0,1.41l-6.31,6.31a7,7,0,0,0-1.35,8,43.88,43.88,0,0,1,1.76,4.27,7,7,0,0,0,6.6,4.68H121a1,1,0,0,1,1,1Z"
              />
            </svg>
            <p>Settings</p>
          </button>
        </div>
    </div>
</template>

<script>
import ShareLinkModal from '../System/ShareLinkModal.vue';

export default {
    name: "SyncTray",
    components: { ShareLinkModal },
    props: {
        lastUpdated: String,
        url: String,
        isModalOpen: Boolean,
    },
    data() {
        return {
            lastUpdated: "Jun 17, 2023",
            url: "https://www.google.com/"
        };
    },
};
</script>

<style scoped lang="scss">
@import "../../assets/variables.scss";
div.wrapper {
    display: flex;
    width: max-content;
    background-color: #fbeff0;
    border-radius: 20px;
    padding: 0px;
}

button.icon-btn {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 10px 15px;
    background: transparent;
    border-radius: 20px;
    transition: all ease-in-out 750ms;
    &:hover {
        background: rgba($hyyp_primary, 0.5);
        transition: all ease-in-out 750ms;
    }
    i.v-icon,
    svg {
        height: 1.2rem;
        width: 1.2rem;
        margin-right: 8px;
    }
    p {
        font-family: $poppins;
        line-height: 1rem;
        font-weight: 500;
    }
}

.last-time {
    display: flex;
    align-items: center;
    height: 40px;
    padding-right: 20px;
    color: $grey_mid;
    font-weight: $medium;
    font-style: italic;
    p {
        font-family: $openSans;
        color: inherit;
        white-space: nowrap;
    }
    span {
        padding-left: 10px;
        white-space: nowrap;
    }
}
.toggle {
    display: none;
}
</style>
