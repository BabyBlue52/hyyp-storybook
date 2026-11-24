<template>
  <div class="feature-card">
    <div class="card-icon-img">
      <slot name="image" />
    </div>
    <div class="card-content">
      <slot name="text" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/variables.scss" as *;

.feature-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  height: 400px;
  margin: 1rem 0.5rem;
  border: 1px solid $border-color-default;
  border-radius: calc(4 * #{$border-radius});
  overflow: hidden;

  .card-icon-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;

    :slotted(img) {
      width: 160px;
      height: auto;
      padding-bottom: 80px;
    }
  }

  .card-content {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 140px;
    padding: 1.5rem;
    background: $offWhite;

    :slotted(h4) {
      color: $secondary-text-color;
      font-size: $subhead;
      text-align: left;
      text-transform: capitalize;
    }

    :slotted(p) {
      padding: 0;
      color: $secondary-text-color;
      text-align: left;
    }
  }
}
</style>
