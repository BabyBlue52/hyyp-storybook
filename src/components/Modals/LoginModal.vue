<template>
    <div v-if="props.isOpen" class="topLevel">
        <div class="locked" @click="closeModal"></div>
        <div :class="[isOpen ? 'fadeIn' : 'fadeOut']" class="centered">
            <div class="modal-container">
                <button class="close-btn" @click="closeModal">
                     <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                </button>
                <h2>Welcome Back </h2>
                <div class="modal-content">
                    <p>Sign in to your HYYP account to continue</p>
    
                    <!-- Error Message -->
                    <div v-if="userStore.getError" class="error-message">
                        {{ userStore.getError }}
                    </div>
    
                    <form @submit.prevent="handleLogin">
                        <div class="row w-100">
                            <div class="hyyp-input w-100">
                                <label>Email</label>
                                <v-text-field v-model="loginData.email" type="email" :disabled="userStore.getLoading" required></v-text-field>
                            </div>
                        </div>
                        <div class="row w-100">
                            <div class="hyyp-input w-100">
                                <label>Password</label>
                                <v-text-field 
                                    v-model="loginData.password" 
                                    :type="showPassword ? 'text' : 'password'" 
                                    :disabled="userStore.getLoading" 
                                    required
                                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showPassword = !showPassword"
                                ></v-text-field>
                            </div>
                        </div>
    
                        <div class="button-section">
                            <button type="submit" class="full-width" :disabled="userStore.getLoading">
                            <p v-if="userStore.getLoading">Signing In...</p>
                            <p v-else>Sign In</p>
                        </button>
                            <div class="d-flex w-100" style="margin: 20px 0">
                                <hr/> or
                                <hr/>
                            </div>
                            <GoogleButton />
                        </div>
                    </form>
                    <p> By continuing you agree to our
                        <Link :text="'Terms of Service'" />. <br/>Read our
                        <Link :text="'Privacy Policy.'" /> </p>
                </div>
    
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/user';
import Link from '@/components/UI/Link.vue';
import GoogleButton from '@/components/Buttons/GoogleButton.vue';
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['close']);

const userStore = useUserStore();

const closeModal = () => {
    emit('close');
    userStore.clearError();
}

const loginData = ref({
    email: "",
    password: "",
})

const showPassword = ref(false)

const handleLogin = async () => {
    try {
        await userStore.login({
            email: loginData.value.email,
            password: loginData.value.password
        });
        // Close modal on successful login
        closeModal();
    } catch (error) {
        console.error('Login error:', error);
        // Error is already set in the store by the login action
    }
}
</script>

<style scoped>
/* Whole modal subtree above HyypHeader (z-index 10) and mobile bar (101); .locked alone was z-index 1 and drew under the header */
.topLevel {
    position: fixed;
    inset: 0;
    z-index: 200;
    isolation: isolate;
}

h2 {
    width: 100%;
    font-size: 2rem;
    font-weight: 900;
    text-align: center;
    color: #37515F;
    margin-top: 20px;
}

p {
    text-align: center;
    font-size: 0.9rem;
    margin: 0;
}

hr {
    position: relative;
    top: 10px;
    width: 100%;
    margin: 0px 10px;
    opacity: 0.2;
}

.link {
    margin: 0;
}

.error-message {
    background-color: #ffebee;
    color: #c62828;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
    text-align: center;
    font-size: 0.9rem;
}

button {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    margin: 8px 0;
    padding: 20px 10px;
    background: #FBF8F8;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

button>span {
    position: absolute;
    left: 15px;
    bottom: 3px;
    width: 30px;
    height: 30px;
}

button.full-width {
    width: 100%;
    background: #37515F;
    color: white;
}

button.full-width:hover:not(:disabled) {
    background: #52798E;
}

button.close-btn {
    position: absolute;
    width: 20px;
    top: 20px;
    height: 20px;;
    margin: 0;
    margin-left: auto;
    padding: 0;
    background: none;
}

button.close-btn > svg {
    margin-left: auto;
}
.button-section {
    margin: 20px 0;
}
.hyyp-input > input {
    min-width: 350px;
}
.centered {
    top: 50%;
}
</style>