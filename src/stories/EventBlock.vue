<template>
    <div v-if="isBooked">
        <div class="date-wrapper">
            <div class="top-bar"></div>
            <div class="event-header">
                <div class="event-date">5</div>
            </div>
            <!-- Loop object of events -->
            <div 
                v-for="event in events.slice(0,3)" 
                class="event-listing">
                <a @click="onClick">
                    <h2>{{ event.name}}</h2>
                    <p>{{ event.startTime }}<span> - </span>{{ event.endTime }}</p>
                </a>
                <v-tooltip></v-tooltip>
            </div>
            <!-- End Loop -->
            <div v-if="hiddenEvents" class="additional-events">
                <p>And {{ extraEvents }} more </p>
                <Link :text="'expand'"/>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="empty">
            <div class="top-bar"></div>
            <div class="event-header">
                <div class="event-date">5</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Link from './Link.vue';
    
    export default {
        name: 'Calendar Event Block',
        components: { Link },
        props: {
            isBooked: Boolean,
        },
        computed: {
            window: () => window,
            hiddenEvents() {
                let extraEvents = this.events.length - 3;
                
                if (extraEvents > 0){
                    return true
                } else { 
                    return false
                }
            },
            
        },
        data: () => ({
            events: [
                {
                    name: 'Event 1',
                    startTime: '10:00',
                    endTime: '14:30',
                },
                {
                    name: 'Event 2',
                    startTime: '10:00',
                    endTime: '14:30',
                },
                {
                    name: 'Event 3',
                    startTime: '10:00',
                    endTime: '14:30',
                },
                {
                    name: 'Event 3',
                    startTime: '10:00',
                    endTime: '14:30',
                },
            ]
        }),
        watch: {
            
        },
        methods: {
            onClick() {
                window.alert(event.name);
            }
        }
    }
</script>

<style scoped>
    .date-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        width: clamp(150px, 16vw, 250px);
        height: clamp( 250px, max-content, 530px);
        border: 1px solid #100409;
        padding: 10px;
        color: #37515F;
    }
    .empty {
        position: relative;
        display: flex;
        flex-direction: column;
        width: clamp(150px, 16vw, 250px);
        height: clamp( 250px, 10vh, 330px);
        border: 1px solid #100409;
        padding: 10px;
        color: #100409;
        opacity: 0.5;
    }
    .empty > .top-bar{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: #100409;
    }
    .top-bar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10px;
        background: #37515F;
    }
    .event-header {
        margin-top: 10px;
        height:max-content;
        width: 100%;
    }
    .event-date {
        
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        font-size: 32px;
        color: inherit;
    }
    .event-listing {
        margin: 5px;
    }
    .event-listing > h2 {
        font-size: 20px;
    }
    .event-listing > p {
        font-size: 16px;
        color: #100409;
    }
    .additional-events {
        display: flex;
        position: relative;
        left: -5px;
        margin-top: 10px;
    }
    .additional-events > p {
        font-size: 12px;
        margin-left: 10px;
    }
    .empty {

    }
</style>
