<template>
  <div>
    <div class="bg-white shadow-sm mt-4 p-4">
      <div class="font-bold text-primary2">Document Shares</div>
      <timeline
        class="mt-4"
        :timelineData="documentShares"
        v-if="documentShares?.length !== 0"
      >
      </timeline>

      <div class="flex flex-column items-center p-4" v-else>
        <icon
          name="not_shard"
          width="h-7"
          height="w-7"
          color="#0B5073"
          class="animate-bounce"
        ></icon>
        <span class="font-bold text-primary2variant-600"> Not Shared </span>
      </div>
    </div>
  </div>
</template>

<script>
import Timeline from "@/components/shared/Timeline.vue";
import Icon from "@/components/shared/Icon.vue";

export default {
  name: "DocumentShareList",
  components: { Icon, Timeline },
  data() {
    return {
      documentShares: [],
    };
  },
  mounted() {
    this.$store
      .dispatch("fetchAllDocumentShares", this.$route.params.documentId)
      .then(() => {
        this.documentShares = this.$store.getters.getAllDocumentShares;
      });
  },
};
</script>

<style scoped></style>
