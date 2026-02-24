<template>
  <div class="hyyp-input">
      <div class="drop-down">
          <label :for="`time-${props.label}`">{{ label }}</label>
          <div class="select-wrapper">
              <select :id="`time-${props.label}`" v-model="selectedTime">
                  <option v-for="time in timeOptions" :key="time.value" :value="time.value">{{ time.label }}</option>
              </select>
              <svg class="dropdown-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg>
          </div>
      </div>
    
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
const props = defineProps({
  label: String,
  modelValue: String
});
const emit = defineEmits(['update:modelValue']);
const selectedTime = ref(props.modelValue || '');
watch(selectedTime, (newVal) => {
  emit('update:modelValue', newVal);
});
watch(() => props.modelValue, (newVal) => {
  selectedTime.value = newVal || '';
});
const timeOptions = computed(() => {
      const options = [];
      for (let hours = 0; hours < 24; hours++) {
        for (let minutes = 0; minutes < 60; minutes += 15) {
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
  );
</script>
<style scoped lang="scss">
  div.drop-down {
      position: relative;
      width: 100% ;
      
      .select-wrapper {
          position: relative;
          width: 100%;
          
          select {
              position: relative;
              top: -1px;
              width: 100%;
              min-height: 2rem;
              padding: 2.5px 10px 0 10px;
              padding-right: 30px;
              border: 1px solid $grey_20;
              border-radius: $border-radius;
              font-size: 0.7rem;
              background: transparent;
              cursor: pointer;
              appearance: none;
              &:focus-visible {
                  outline: none;
                  border-bottom: 2px solid $black;
              }
          }
          
          .dropdown-icon {
              position: absolute;
              right: 8px;
              top: 50%;
              transform: translateY(-50%);
              width: 16px;
              height: 16px;
              pointer-events: none;
              fill: $grey_20;
          }
      }
  }
  
</style>