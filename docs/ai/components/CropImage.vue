<template>
  <img :src="src" :style="cropStyle" class="ne-image" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: String,
  crop: { type: Array, default: () => [0,0,1,1] },
  width: Number
})

const cropStyle = computed(() => {
  const [x1,y1,x2,y2] = props.crop
  return {
    objectFit: 'cover',
    objectPosition: `${x1*100}% ${y1*100}%`,
    width: props.width ? props.width + 'px' : 'auto',
    height: 'auto'
  }
})
</script>