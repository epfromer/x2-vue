<template>
  <div>
    <p>email detail</p>
    <p>{{ id }}</p>
    <router-link :to="{ name: 'EmailList' }">back to list</router-link>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>
