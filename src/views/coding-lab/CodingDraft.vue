<template>
  <button @click="test">click</button>
  <div ref="container">123</div>
</template>

<script setup>
import { ref } from 'vue'
const image = document.createElement('img')

image.src =
  'https://admin-qa.weizhipin.com/admin/certification/api/image/common/new/view?source=appeal_bzl&key=4276d85d03e33f91yCYwh8LuRRAUm9r2Tr_cEKa9zreQY0E-waVTmLzsI4KyR1NKR-CXnbEsONCl7EkoGd5bmShr595-7NhuGFTpy-FhZ-yhLpVct-7sVmkpYwwFqSEPraijECcYQrXiWENukdpPTAzjmK1Y_A8cVYaxhncoU3NF6nqdag~~'

const container = ref()

const test = () => {
  container.value.appendChild(image)
}
</script>
