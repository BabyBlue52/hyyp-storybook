<template>
    <v-btn
      @click="$event => isOpen = !isOpen"
    > open notification </v-btn>
    
    <div class="toast-wrapper" :class="[isOpen ? 'show' : 'hide']">
        
        <div :class="msgType.class">
            <v-icon :icon= 'msgType.icon' ></v-icon>
        </div>
        <div class="toast-msg">
            <p >{{ msgType.text }}</p>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'Toast Notification',
    props: {
        msg: String,
        // isRendered: Boolean,
        status: String,
        icon: String,
        isOpen: Boolean
    },
    // data: () => ({
    //   snackbar: false,
    // }),
    computed: {
        msgType() {
            if(this.status === 'success') return {
                'class':'toast-success',
                'icon': 'mdi-check',
                'text': 'success message'
            }
            if(this.status === 'error') return {
                'class':'toast-error',
                'icon': 'mdi-alert-circle-outline',
                'text': 'this is the message'
            }
            return {
                'class':'toast-system',
                'icon': 'mdi-information',
                'text': 'this is the message'
            }
        }
    },methods: {
        closeDialog() {
            if (isOpen === true) {
            setTimeout(() => {
                this.isOpen(false)
            }, 10000);
            }
            
        }
    }
}
</script>

<style scoped>
.toast-wrapper {
    display: flex;
    position: absolute;
    bottom: 5%;
    left: calc(50vw - 250px);
    width: 500px;
    height: 80px;
    border: 2px solid #cccccc;
    border-radius: 5px;
    padding: 20px;
    background: white;
}
.toast-error {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -22px;
    left: -22px;
    min-width:80px;
    height: 80px;
    border-radius: 5px 0 0 5px;
    background: #FF4D4D;
    color: white;
}
.toast-success {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -22px;
    left: -22px;
    min-width:80px;
    height: 80px;
    border-radius: 5px 0 0 5px;
    background: #59D96C;
    color: white;
}
.toast-system {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -20px;
    left: -20px;
    min-width: 78px;
    height: 76px;
    border-radius: 5px 0 0 5px;
    background: #F8F8F8;
    color: #707070;
}
.toast-msg {
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    min-width: max-content;
    max-width: 300px;
    white-space: wrap;

}
.toast-msg > p {
    max-width: 360px;
    line-height: 1.25em;
}
.v-icon {
    position: relative;
    /* right: 1px; */
    font-size: 2.6rem;
    text-align: center;
    color: inherit;
}
.show {
    bottom: -200px;
}
</style>