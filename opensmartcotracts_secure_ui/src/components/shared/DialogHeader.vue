<template>
  <div class="flex flex-col bg-gray-200 rounded-tr-md rounded-tl-lg">
    <div class="flex flex-row justify-center" style="width: 100% !important;" >
      <div class="grow ml-2 p-1 font-bold">
        {{ title }}
      </div>
      <div class="bg-red rounded-tr-lg p-1 hover:cursor-pointer" @click.native="close">
        <v-icon color="white">mdi-close</v-icon>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "DialogHeader",
  props: {
    title: String,
    dialog: Boolean
  },
  methods: {
    close() {
      this.$emit('dialog', false)
    }
  }
}
</script>

<style scoped>

</style>