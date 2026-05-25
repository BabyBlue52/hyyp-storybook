<template>
  <div ref="buttonContainerRef" class="google-button-wrapper"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const buttonContainerRef = ref(null);

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/** Load Google Identity Services script and resolve when google.accounts.id is available. */
/** written by ChatGPT */
function loadGis() {
  if (typeof window.google !== 'undefined' && window.google?.accounts?.id) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
    if (script) {
      const deadline = Date.now() + 15000;
      const t = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(t);
          resolve();
        } else if (Date.now() > deadline) {
          clearInterval(t);
          reject(new Error('Google Identity Services did not load'));
        }
      }, 100);
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.defer = true;
    s.onload = () => {
      const deadline = Date.now() + 10000;
      const t = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(t);
          resolve();
        } else if (Date.now() > deadline) {
          clearInterval(t);
          reject(new Error('Google Identity Services did not load'));
        }
      }, 50);
    };
    s.onerror = () => reject(new Error('Failed to load Google Identity Services'));
    document.head.appendChild(s);
  });
}

function handleCredentialResponse(response) {
  const credential = response?.credential;
  if (!credential) return;
  if (userStore.loginWithGoogle) {
    userStore.loginWithGoogle(credential);
  } else {
    console.log('Google signed in, credential (JWT):', credential.slice(0, 50) + '...');
  }
}

onMounted(() => {
  if (!clientId) return;
  loadGis()
    .then(() => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });
      if (buttonContainerRef.value) {
        window.google.accounts.id.renderButton(buttonContainerRef.value, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          width: buttonContainerRef.value.offsetWidth || 320,
        });
      }
    })
    .catch((e) => {
      console.error('Google Sign-In:', e?.message || e);
    });
});
</script>

<style scoped lang="scss">
.google-button-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 350px;
  min-height: 48px;
  
  :deep(iframe) {
    min-width: 100% !important;
  }
}
@media screen and (max-width: 768px) {
    .google-button-wrapper {
        min-width: 90%;
    }
}
</style>
