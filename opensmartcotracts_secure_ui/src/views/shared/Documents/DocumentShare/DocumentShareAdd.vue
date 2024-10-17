<template>
  <div>
    <span
      @click="dialog = true"
      class="button-primary mx-2 flex justify-center items-center"
    >
      <icon name="share" class="h-4 w-4 mr-2" color="#fff"></icon>
      Share
    </span>
    <v-dialog v-model="dialog">
      <div class="rounded-lg bg-white" style="width: 600px !important">
        <DialogHeader
          class="!w-full"
          title="Share Document"
          :dialog="dialog"
          @dialog="onCloseDialog"
        ></DialogHeader>

        <dynamic-form
          :form="DocumentShareAddFields"
          @submitted="shareDocument"
          @error="processErrors"
        />
        <button
          submit="true"
          :form="DocumentShareAddFields.id"
          class="btn-submit btn-submit-right"
        >
          Submit
        </button>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import DialogHeader from "@/components/shared/DialogHeader.vue";
import Icon from "@/components/shared/Icon.vue";
import { DocumentShareAddFields } from "@/views/shared/Documents/DocumentShare/DocumentShareAddFields";
import { notifyFormValidationError } from "@/services/notificationService";

export default {
  name: "DocumentShareAdd",
  components: {
    DialogHeader,
    Icon,
  },
  data() {
    return {
      dialog: false,
      DocumentShareAddFields,
    };
  },
  methods: {
    async processErrors() {
      await notifyFormValidationError();
    },
    async shareDocument(documentShareData) {
      this.$store.dispatch("setLoadingStatus", true);
      this.$store
        .dispatch("addDocumentShare", {
          ...documentShareData,
          identification: this.$route.params.documentId,
        })
        .then(() => {
          this.$store.dispatch("setLoadingStatus", false);
        });
    },
    onCloseDialog(value) {
      this.dialog = value;
    },
  },
};
</script>

<style scoped></style>
