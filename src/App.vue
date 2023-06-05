<template>
  <ElHeader class="appHeader">H5 测试数据档案馆</ElHeader>
  <ElContainer>
    <ElAside width="200px">
      <MenuAside />
    </ElAside>
    <ElContainer>
      <ElMain class="work-space">
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const MenuAside = defineAsyncComponent(() => import('./components/MenuAside.vue'))
</script>

<style lang="less" scoped>
.appHeader {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 0.24rem;
  color: #fff;
  background: linear-gradient(135deg, #59ae6a, #48ae96, #60d9ec, #65a5d5, #9491e0, #c382a4);
}
.work-space {
  max-height: calc(100vh - 76px);
}
</style>
