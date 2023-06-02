<template>
  <ElHeader class="appHeader">H5 测试数据档案馆</ElHeader>
  <ElContainer>
    <ElAside width="200px">Aside</ElAside>
    <ElContainer>
      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style lang="less" scoped>
.appHeader {
  color: #fff;
  font-size: 0.24rem;
  font-weight: bold;
  background: linear-gradient(135deg, #59ae6a, #48ae96, #60d9ec, #65a5d5, #9491e0, #c382a4);
  display: flex;
  align-items: center;
}
</style>
