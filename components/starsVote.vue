<template>
  <div>
    <span v-for="i in fullStars" :key="'full-' + i"><FontAwesomeIcon icon="fas fa-star" /></span>
    <span v-for="i in emptyStars" :key="'empty-' + i"><FontAwesomeIcon icon="far fa-star" /></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  quantidade: {
    type: Number,
    required: true
  }
})

const fullStars = ref([])
const emptyStars = ref([])

watchEffect(() => {
  const num = Math.round(props.quantidade / 2)
  fullStars.value = []
  emptyStars.value = []

  for (let i = 0; i < 5; i++) {
    if (i < num) {
      fullStars.value.push(i)
    } else {
      emptyStars.value.push(i)
    }
  }
})
</script>

<style scoped>
span {
  font-size: 12px;
  color: gold;
}
</style>
