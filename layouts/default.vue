<template>
  <div>
    <LayoutHeader />
    <KeepAlive>
      <slot />
    </KeepAlive>
    <LayoutFooter />
  </div>
</template>

<script>

</script>
<style scoped>
 .layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.main-content {
  flex: 1;
}
</style>