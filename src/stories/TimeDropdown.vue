<template>
    <div class="hyyp-input-sm">
        <div class="drop-down">
            <label for="time">{{ label }}</label>
            <select id="time" v-model="selectedTime">
                <option v-for="time in timeOptions" :key="time.value" :value="time.value">{{ time.label }}</option>
                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg>
            </select>
        </div>
      
    </div>
  </template>
  
  <script>
  export default {
    props: {
        label: String
    },  
    data() {
      return {
        selectedTime: '',
      };
    },
    computed: {
      timeOptions() {
        const options = [];
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = Math.floor(now.getMinutes() / 15) * 15;
  
        for (let hours = currentHour; hours < 24; hours++) {
          const startMinutes = hours === currentHour ? currentMinute : 0;
          
          for (let minutes = startMinutes; minutes < 60; minutes += 15) {
            let hour12 = hours % 12;
            if (hour12 === 0) hour12 = 12;
            const ampm = hours < 12 ? 'AM' : 'PM';
            const time = {
              value: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
              label: `${String(hour12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`,
            };
            options.push(time);
          }
        }
        return options;
      },
    },
  };
  </script>
<style scoped lang="scss">
    @import "../assets/variables.scss";
    div.drop-down {
        position: relative;
        width: calc(100% - 20px);
        
        select {
            position: relative;
            top: -1px;
            width: 100%;
            min-height: 2rem;
            margin: 5px 10px;
            padding: 2.5px 10px 0 10px;
            border: 1px solid $grey_dark;
            border-radius: 2px;
            font-size: 0.7rem;
            background: transparent;
            cursor: pointer;
            &:focus-visible {
                outline: none;
                border-bottom: 2px solid $black;
            }
            &:after {

            }
        }
        label {
            position: absolute;
            left: 15px;
            top: -5px;
            background: white;
            padding: 1px 5px;
            font-size: 0.7rem;
            z-index: 1;
        }
    }
    
</style>