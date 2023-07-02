<template>
    <ul class="time-scale">
        <li class="list__item">
            <label class="label--radio">
            <input type="radio" class="radio" name="calendar-size" value="day" @input="update">
              Day
          </label>
        </li>
        <li class="list__item">
            <label class="label--radio">
            <input type="radio" class="radio" name="calendar-size" checked  value="week" @input="update">
              Week
          </label>
        </li>
        <li class="list__item">
            <label class="label--radio">
            <input type="radio" class="radio" name="calendar-size" value="month"
            @input="update">
              Month
          </label>
        </li>
        <li class="list__item">
            <label class="label--radio">
            <input type="radio" class="radio" name="calendar-size" value="year" @input="update">
              Year
          </label>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'TimeScale',
    props: {
        size: Array,
    },
    data() {
        return {
          
        }
    },
    methods: {
        update: function(event) {
            let value = event.target.value;
            
        }
    }
}
</script>

<style scoped>
.time-scale {
    list-style: none;
    display: flex;
    flex-direction: row;
    width: max-content;
    height: max-content;
    max-height: 56px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.list__item {
    margin: 1rem 0 1rem 0;
    padding: 0;
}

.label--checkbox,
.label--radio {
    position: relative;
    top:-20px;
    display: flex;
    flex-direction: column-reverse;
    margin: 0.5rem;
    padding: 10px;
    font-family: inherit, sans-serif;
    font-weight: 500;
    font-size: 0.9rem;
    line-height: 100%;
    cursor: pointer;
    
}
.radio {
    position: relative;
    margin: .5rem 0 0;
    cursor: pointer;
}

.radio:before {
    -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    -moz-transition: -moz-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    -webkit-transform: scale(0, 0);
    -moz-transform: scale(0, 0);
    -ms-transform: scale(0, 0);
    -o-transform: scale(0, 0);
    transform: scale(0, 0);
    content: "";
    position: absolute;
    top: 0px;
    left: 38%;
    z-index: 1;
    width: 0.5rem;
    height: 0.5rem;
    background: #E4959E;
    border-radius: 50%;
}

.radio:checked:before {
    -webkit-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    transform: scale(1, 1);
}

.radio:after {
    content: "";
    position: absolute;
    top: -0.25rem;
    left: 25%;
    width: 1.25rem;
    height: 1.25rem;
    background: #fff;
    
    border-radius: 50%;
}
</style>