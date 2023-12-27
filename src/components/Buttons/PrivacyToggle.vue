<template>
    <div class="d-flex">
        <div :class="[ !isPublic ? 'private-toggle' : 'inactive']" @click="setPrivate" class="toggle">
            <v-icon icon="mdi-lock"></v-icon> 
            <span>Private</span>
        </div>
        <div :class="[ isPublic ? 'public-toggle' : 'inactive']" @click="setPublic" class="toggle">
            <v-icon icon="mdi-account-group"></v-icon>       
            <span>Public</span>
        </div>
    </div>
</template> 

<script>
    export default {
        name: 'Privacy Toggle',
        props: {
            isPublic: Boolean,
        },
        data() {
            return {
                isPublic: true
            }
        },
        methods: {
           setPrivate() {
                this.isPublic = false;
            },
            setPublic() {
                this.isPublic = true;
            } 
        }
    }    
</script>

<style scoped>
    div.toggle {
        display: flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        min-width: 110px;
        height: 30px;
        border: none;
        padding: 20px;
        border-radius: 5px;
        color: #37515F;
        cursor: pointer;
    }
    .public-toggle {
        background:#BCF0C4;
    }
    .private-toggle {
        background:#DCE6F2;
    }
    .inactive {
        background:none;
    }
    div.toggle > span {
        line-height: 0rem;
        color: #37515F;
        font-size: 0.8rem;
        margin-left: 5px;
    }
    i.v-icon {    
        transform: scale(0.8);
        position: relative;
        top: -1px;
    }
    
</style>