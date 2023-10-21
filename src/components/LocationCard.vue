<template>
    <div class="card">
        <p class="street">835 Boehm Crossroad</p>
        <p class="location"> 
            <span id="city">Cincinnati</span>,
            <span id="state"> OH</span>
            <span id="zip">45206</span>
        </p>
        <p class="phone">+1 513-918-2132</p>
    </div>
    <Link text="Open in Maps"/>
</template>
<script>
    import Link from './Link.vue';
    export default {
        name: 'Tag',
        components: { Link },
        props: {
            title: String,
        },
    }    
</script>

<style scoped>
    .card {
        min-width: 300px;
        max-width: 300px;
        height: max-content;
        margin-bottom: 5px;
        border-radius: 5px;
        padding: 20px;
        background: #f6f6f6;
    }
    p {
        font-size: 0.9rem;
    }
    p.street {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
        margin-bottom: 2px;
    }
    #state {
        margin-right: 5px
    }

    
</style>