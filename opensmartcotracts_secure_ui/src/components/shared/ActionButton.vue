<template>
  <span class="border-1 hover:cursor-pointer px-4 py-1 text-sm rounded-md mx-1"
    :class="styles">
    {{ name }}
  </span>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    name: String,
    styles: String
  }
}
</script>

<style scoped>

</style>