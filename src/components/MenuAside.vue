<template>
  <ElMenu class="app-menu" router unique-opened :default-openeds="defaultOpeneds">
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
      <ElMenuItem v-for="(child, i) in item.children" :key="i" :index="child.path">
        {{ child.label }}
      </ElMenuItem>
    </ElSubMenu>
  </ElMenu>
</template>

<script setup>
import { menuConfig } from '../config/menu'

const defaultOpeneds = ['0']
</script>

<style lang="less" scoped>
.app-menu {
  height: calc(100vh - 76px);
}
</style>
