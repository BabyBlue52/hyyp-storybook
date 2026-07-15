import { onScopeDispose, ref } from 'vue'


const visible = ref(false)
const message = ref('')
let hideTimer = null

function clearHideTimer() {
    if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
    }
}

/**
 * App-wide toast state. Mount <HyypToast> once in App.vue; call show() from any page.
 */
export function useToast() {
    function show(text, ) {
        clearHideTimer()
        message.value = text ?? ''
        visible.value = true

        hideTimer = setTimeout(() => {
            visible.value = false
            message.value = ''
            hideTimer = null
        }, 500)
    }

    function hide() {
        clearHideTimer()
        visible.value = false
        message.value = ''
    }

    onScopeDispose(clearHideTimer)

    return {
        visible,
        message,
        show,
        hide,
    }
}
