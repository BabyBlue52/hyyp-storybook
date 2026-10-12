<template>
    <footer class="footer">
        <v-container fluid>
            <v-row class="d-flex align-center">
                <v-col cols="12" sm="4">
                    <v-row col="12">
                        <p>{{ copyrightText}}</p>
                        <p>{{ yearText }}</p>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="8" class="d-flex justify-end">
                    <!-- LinkedIn -->
                    <v-icon icon="mdi-linkedin"></v-icon>
                    <!-- Instagram -->
                    <v-icon icon="mdi-instagram"></v-icon>
                </v-col>
            </v-row>
        </v-container>
    </footer>
    <footer v-if="!hideMobile" class="mobile-footer">
        <div class="row justify-center my-5">
            <!-- LinkedIn -->
            <v-icon icon="mdi-linkedin"></v-icon>
            <!-- Instagram -->
            <v-icon icon="mdi-instagram"></v-icon>
        </div>
        <div class="row">
            <Link/>
        </div>
        <div class="row column align-center">
            <p>{{ copyrightText}}</p>
            <p>{{ yearText }}</p>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Link from '../UI/Link.vue';

const route = useRoute();

const hideMobile = computed(() => route.path.startsWith('/venues/'));

const currentYear = computed(() => new Date().getFullYear());
const yearText = `© ${currentYear.value} Hyyp LLC.`
const copyrightText = `All rights reserved.`
</script>

<style lang="scss" scoped>
footer.footer {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    position: relative;
    width: 100%;
    height: 50px;
    padding: 5px 20px;
    border-top: 1px solid rgba($grey_80, 0.5);
    background-color: white;
    i {
        font-size: 2.25rem;
        margin: 0 10px;
        color: $gunMetal;
        &:hover {
            transform: scale(1.05);
            color: $gunMetal_40;
            cursor: pointer;
        }
    }
    p,
    small {
        text-transform: capitalize;
    }
}

footer.mobile-footer {
    display: none;
}

@media screen and (max-width: $mobileScreenSize) {
    footer.footer {
        display: none;
    }
    footer.mobile-footer {
        position: relative;
        z-index: 8;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-top: 1px solid $grey_90;
        background: white;
        p {
            width: max-content;
        }
        i {
            font-size: 2.25rem;
            margin: 0 10px;
            color: $gunMetal;
        }
    }
}
</style>
