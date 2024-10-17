<template>
  <div>
    <app-header title="Document Details"></app-header>

    <div class="card col-md-12 mx-auto slide-left">
      <div class="row">
        <span class="col-md-6">
          <div class="dashed-border slide-left flex flex-column">
            <span class="font-bold text-primary2"> Document Name </span>
            {{ documentData?.documentName }}
          </div>
        </span>
        <span class="col-md-6">
          <div class="dashed-border slide-left flex flex-column">
            <span class="font-bold text-primary2"> Created Date </span>
            {{ documentData?.time }}
          </div>
        </span>
        <span class="col-md-12">
          <div class="dashed-border slide-left flex flex-column">
            <span class="font-bold text-primary2"> Description </span>
            {{ documentData?.documentDescription }}
          </div>
        </span>
        <span class="col-md-12">
          <div class="slide-left">
            <div class="font-bold text-primary2">Actions</div>
            <div class="flex flex-row">
              <span
                @click="openDocument"
                class="btn-outline flex justify-center items-center"
              >
                <icon name="eye" class="h-4 w-4 mr-2" color="#000"></icon>
                Open
              </span>
              <document-share-add :dialog="shareDialog"></document-share-add>
            </div>
          </div>
        </span>
      </div>
    </div>

    <document-share-list></document-share-list>
  </div>
</template>

<script>
import AppHeader from "@/components/shared/AppHeader.vue";
import { encodeText } from "@/interfaces/global.interface";
import Icon from "@/components/shared/Icon.vue";
import DocumentShareList from "@/views/shared/Documents/DocumentShare/DocumentShareList.vue";
import DocumentShareAdd from "@/views/shared/Documents/DocumentShare/DocumentShareAdd.vue";

export default {
  name: "DocumentDetails",
  components: { DocumentShareAdd, DocumentShareList, Icon, AppHeader },
  data() {
    return {
      documentData: {},
    };
  },
  methods: {
    async getDocuments() {
      this.$store.dispatch("clearDocuments");
      this.$store.dispatch("setLoadingStatus", true);
      this.$store.dispatch("fetchAllDocuments").then(() => {
        this.$store.dispatch("setLoadingStatus", false);
        this.getDocument();
      });
    },
    getDocument() {
      this.documentData = this.$store.getters.getDocumentByCid(
        this.$route.params.cid
      );
    },
    openDocument() {
      const documentName = encodeText(this.documentData.documentName);
      this.$router.push(
        `/${this.$route.meta.userAccessed}/document-view/${this.documentData.documentCid}/${documentName}`
      );
    },
  },
  mounted() {
    this.getDocument();
    if (!this.documentData) {
      this.getDocuments();
    }
  },
};
</script>

<style scoped></style>
