<template>
  <div class="detail" v-for="item in listDisplay" :key="item._id">
    <span class="important-info android-version">安卓{{ item.androidVersion }}</span>
    <span class="important-info chrome-version">{{ item.chromeVersion }}</span>
    <span :class="item.available ? 'status available' : 'status unavailable'">{{
      item.available ? '可用' : '不可用'
    }}</span>
    <span>{{ item.brandName }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const listDisplay = computed(() => {
  return props.data.toSorted((a, b) => {
    return +a.androidVersion - +b.androidVersion
  })
})
</script>

<style lang="less">
.detail {
  display: flex;
  align-items: center;
  .important-info {
    color: #409eff;
  }
  .android-version {
    width: 0.8rem;
  }
  .chrome-version {
    width: 2rem;
  }
  .status {
    width: 0.8rem;
  }
  .available {
    color: #67c23a;
  }
  .unavailable {
    color: #f56c6c;
  }
}
.detail + .detail {
  margin-top: 0.06rem;
}
</style>
