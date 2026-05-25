<template>
    <footer>
        <div class="d-flex row justify-space-bewteen mb-0">
            <div class="v-col-2 d-flex justify-left pt-4">
                <small>©<span>{{ currentYear }}</span> datFlo LLC.</small>
            </div>
            <div class="v-col-10 d-flex justify-end align-center">
                <!-- LinkedIn -->
                <svg viewBox="0 0 56.693 56.693" xmlns="http://www.w3.org/2000/svg"><g><path d="M30.071,27.101v-0.077c-0.016,0.026-0.033,0.052-0.05,0.077H30.071z"/><path d="M49.265,4.667H7.145c-2.016,0-3.651,1.596-3.651,3.563v42.613c0,1.966,1.635,3.562,3.651,3.562h42.12   c2.019,0,3.654-1.597,3.654-3.562V8.23C52.919,6.262,51.283,4.667,49.265,4.667z M18.475,46.304h-7.465V23.845h7.465V46.304z    M14.743,20.777h-0.05c-2.504,0-4.124-1.725-4.124-3.88c0-2.203,1.67-3.88,4.223-3.88c2.554,0,4.125,1.677,4.175,3.88   C18.967,19.052,17.345,20.777,14.743,20.777z M45.394,46.304h-7.465V34.286c0-3.018-1.08-5.078-3.781-5.078   c-2.062,0-3.29,1.389-3.831,2.731c-0.197,0.479-0.245,1.149-0.245,1.821v12.543h-7.465c0,0,0.098-20.354,0-22.459h7.465v3.179   c0.992-1.53,2.766-3.709,6.729-3.709c4.911,0,8.594,3.211,8.594,10.11V46.304z"/></g></svg>
                <!-- Instagram -->
                <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path class="cls-1" d="M83,23a22,22,0,0,1,22,22V83a22,22,0,0,1-22,22H45A22,22,0,0,1,23,83V45A22,22,0,0,1,45,23H83m0-8H45A30.09,30.09,0,0,0,15,45V83a30.09,30.09,0,0,0,30,30H83a30.09,30.09,0,0,0,30-30V45A30.09,30.09,0,0,0,83,15Z"/><path class="cls-1" d="M90.14,32a5.73,5.73,0,1,0,5.73,5.73A5.73,5.73,0,0,0,90.14,32Z"/><path class="cls-1" d="M64.27,46.47A17.68,17.68,0,1,1,46.6,64.14,17.7,17.7,0,0,1,64.27,46.47m0-8A25.68,25.68,0,1,0,90,64.14,25.68,25.68,0,0,0,64.27,38.47Z"/></svg>
            </div>
        </div>
    
    </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
@use "@/assets/variables.scss" as *;
footer {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    position: relative;
    width: 100%;
    height: 50px;
    padding: 5px 20px;
    border-top: 1px solid rgba($grey_80, 0.5);
    background-color: white;
    svg {
        width: 24px;
        margin: 0 10px;
        fill: $gunMetal;
        &:hover {
            fill: $primary;
            cursor: pointer;
        }
    }
}
</style>