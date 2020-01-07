<template>
  <div>
    <p>email list</p>
    <router-link :to="{ name: 'EmailDetail', params: { id: 'abc123' } }"
      >abc123</router-link
    >
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
