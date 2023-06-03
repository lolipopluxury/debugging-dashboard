<template>
  <div>
    tbs overview
    <p>{{ resource }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiFetchTbsData } from '../../services'

const resource = ref()

const fetchData = async () => {
  const res = await apiFetchTbsData()
  resource.value = res
}

fetchData()
</script>
