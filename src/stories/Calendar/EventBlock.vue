<template>
    <div v-switch="events">
        <div v-if="event === 'booked'" >
            <div class="date-wrapper booked">
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
                    <p>And {{ hiddenEvents.extraEvents }} more </p>
                    <Link :text="'expand'"/>
                </div>
            </div>
        </div>

        <div v-else-if="event === 'today'" >
            <div class="date-wrapper today">
                <div class="top-bar"></div>
                <div class="event-header">
                    <div class="event-date">5</div>
                </div>
            </div>
        </div>

        <div v-else-if="event === 'highlighted'" >
            <div class="date-wrapper selected">
                <div class="top-bar"></div>
                <div class="event-header">
                    <div class="event-date">5</div>
                </div>
            </div>
        </div>

        <div v-else="event === 'empty'" >
            <div class=" date-wrapper empty">
                <div class="top-bar"></div>
                <div class="event-header">
                    <div class="event-date">5</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Link from '../Link.vue';

    export default {
        name: 'Calendar Event Block',
        components: { Link },
        props: {
            event: ''
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
            event: '',
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
                    name: 'Event 4',
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
        width: clamp( 200px,calc(80vw / 7), 250px);
        height: 300px;
        border: 1px solid #37515F;
        padding: 10px;
        color: #37515F;
    }
    .selected {
        position: absolute;
        transform: scale(1.05);
        color: #59d96c;
        border: 1px solid #59d96c;

        -webkit-box-shadow: -9px 3px 14px -1px rgba(0,0,0,0.10);
        -moz-box-shadow: -9px 3px 14px -1px rgba(0,0,0,0.10);
        box-shadow: -9px 3px 14px -1px rgba(0,0,0,0.10);
    }
    .empty {
        opacity: 0.5;
    }
    .today {
        border: 1px solid  #E4959E;
        color: #E4959E;
    }
    .top-bar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
    }
    .empty > .top-bar{
        background: #100409;
    }
    .booked > .top-bar {
        background: #37515F;
    }
    .today > .top-bar {
        background: #E4959E;
        color:#E4959E;
    }
    .selected > .top-bar {
        background: #59d96c;
    }
    .event-header {
        margin-top: 10px;
        height:max-content;
        width: 100%;
        color: inherit;
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
        color: inherit;
    }
    .event-listing > p {
        font-size: 16px;
        color: inherit;
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
</style>