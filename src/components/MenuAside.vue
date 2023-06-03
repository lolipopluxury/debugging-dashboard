<template>
  <ElMenu class="app-menu">
    <ElSubMenu
      v-for="(item, index) in menuConfig"
      :key="index"
      :index="`${index}`"
      :title="item.label"
    >
      <template #title>
        <ElIcon :size="20"> <Edit /> </ElIcon>
        <span>{{ item.label }}</span>
      </template>
      <ElMenuItem
        v-for="(child, i) in item.children"
        :key="i"
        :index="`${index}-${i}`"
        :title="child.label"
        @click="onMenuClick(child.name)"
        >{{ child.label }}</ElMenuItem
      >
    </ElSubMenu>
  </ElMenu>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { menuConfig } from '../config/menu'

const router = useRouter()

const onMenuClick = (name) => {
  router.push({
    name
  })
}
</script>

<style lang="less" scoped>
.app-menu {
  height: calc(100vh - 76px);
}
</style>
