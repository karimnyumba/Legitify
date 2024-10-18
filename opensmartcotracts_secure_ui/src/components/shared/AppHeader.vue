<template>
  <div class="flex flex-col w-full mb-4">
    <div class="p-2 flex flex-row slide-left w-full">
      <div v-if="!back" @click.native="backNavigate" class="p-2 rounded-md bg-gradient hover:cursor-pointer hover:drop-shadow">
        <v-icon>mdi-arrow-left</v-icon>
      </div>
      <div class="font-bold p-2 text-xl my-auto" >{{ title }}</div>
    </div>
    <hr class="mx-2 bg-primary2" />
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    title: String,
    back: Boolean
  },
  methods: {
    backNavigate() {
      if (window.history?.length > 2) this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>