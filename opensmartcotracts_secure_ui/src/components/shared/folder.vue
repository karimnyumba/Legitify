<template>
  <div class="border-gray-300 border rounded-md shadow-md shadow-primary2 p-2">
    <span class="focus:transition-colors hover:translate-x-1">
      <FolderIcon />
    </span>

    <div
      class="flex items-center justify-center bg-gray-300 text-sm py-2 rounded-sm font-bold"
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
import FolderIcon from "@/components/icons/folder-icon.vue";
export default {
  name: "FolderComponent",
  components: { FolderIcon },
  props: {
    name: String,
    title: String,
  },
};
</script>

<style scoped></style>
