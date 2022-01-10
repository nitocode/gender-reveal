<script setup>
const props = defineProps({
  text: String
})
</script>

<template>
  <div class="circle-container">
    <div class="circle-content" v-html="text"></div>
    <div class="pulse-1"></div>
    <div class="pulse-2"></div>
  </div>
</template>

<style lang="scss" scoped>
  .circle-container, .pulse-1, .pulse-2 {
    width: 100%;
    height: 100%;
    border: 1px solid #FFF;
    border-radius: 50%;
  }
  .pulse-1, .pulse-2 {
    position: absolute;
    top: -1px;
    left: -1px;
    animation: pulse 0.5s infinite;
  }
  .pulse-2 {
    animation-delay: 0.15s;
  }
  .circle-container {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  @keyframes pulse {
    from {
      transform: scale(1);
      opacity: 1;
      filter: blur(0);
    }

    to {
      transform: scale(2);
      opacity: 0;
      filter: blur(2px);
    }
  }
</style>