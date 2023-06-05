<template>
  <ElText type="primary">当前数据量：{{ data.length }}</ElText>
  <p v-for="item in data" :key="item._id">{{ item }}</p>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
</script>
