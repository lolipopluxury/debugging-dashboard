<template>
  <div>
    tbs overview
    <p>{{ resource }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiFetchTbsData } from '../../services'

const resource = ref([])

const total = ref(0)

const page = 1

const pageSize = 1000000

const fetchData = async () => {
  const res = await apiFetchTbsData({ params: { category: 'css', pageSize, page } })
  resource.value = res.list
  total.value = res.total
}

fetchData()
</script>
