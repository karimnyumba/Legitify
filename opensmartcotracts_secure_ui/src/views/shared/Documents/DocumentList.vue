<template>
  <div>
    <app-header title="Documents"></app-header>
    <document-add></document-add>
    <v-dialog v-model="dialog" width="500">
      <div class="rounded-lg bg-white" style="width: 600px !important">
        <DialogHeader
          class="!w-full"
          :dialog="dialog"
          @dialog="onCloseDialog"
        ></DialogHeader>
        <div
          class="px-4 py-4 h-15 items-center flex bg-gray-300 text-gradient font-semibold text-lg border-b-white rounded-md"
        >
          <p>Append Certificate</p>
        </div>

        <div>
          <v-form
            @submit.prevent="updateDocFunction"
            ref="form"
            class="px-2 shadow-md rounded-md mx-2 my-6 py-4 bg-gray-200"
          >
            <input
              @change="onChanges"
              type="file"
              id="document"
              class="file mx-4"
            />
            <div class="flex justify-end w-full px-2 py-2">
              <v-btn type="submit" class="mt-4 bg-gradient" color="" block>
                SUBMIT
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </v-dialog>
    <div
      class="bg-[url('/public/images/palette.svg')] bg-cover h-40 bg-no-repeat shadow-inner shadow-gray-400 py-6 rounded-md mt-5"
    >
      <div class="flex justify-start pl-8">
        <div
          class="border-2 hover:cursor-pointer border-dotted border-gray-400 rounded-sm h-28 flex justify-center items-center w-40 bg-gray-200"
        >
          <v-icon class="text-primary2" size="40">mdi-plus</v-icon>
        </div>
      </div>

      <!-- <div class="flex flex-row flex-wrap gap-1 mt-4 pl-8">
        <div
          :key="index"
          v-for="(folder, index) of folders"
          class="hover:cursor-pointer"
        >
          <FolderComponent :title="folder" />
        </div>
      </div> -->
    </div>
    <div class="my-2">
      <simple-data-table
        class=""
        :columns="columns"
        :table-data="documents"
        :hasData="isDocs"
        has-actions="true"
      >
        <template #actions="{ data }">
          <div class="flex">
            <action-button
              v-if="!data.hasDocument"
              @click="updateDoc(data)"
              name="Append document +"
              styles="bg-secondary-focus px-4 py-2 text-white"
            >
            </action-button>
            <action-button
              @click="openDoc(data)"
              name="View"
              styles="px-8 py-2 bg-secondary text-white flex items-center font-semibold "
            >
            </action-button>
          </div>
        </template>
      </simple-data-table>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/shared/AppHeader";
import FolderComponent from "@/components/shared/folder.vue";
import DocumentAdd from "@/views/shared/Documents/DocumentAdd";
import SimpleDataTable from "@/components/shared/SimpleDataTable.vue";
import ActionButton from "@/components/shared/ActionButton.vue";
import Icon from "@/components/shared/Icon.vue";
import FolderIcon from "@/components/icons/folder-icon.vue";

export default {
  name: "DocumentList",
  components: {
    Icon,
    ActionButton,
    DocumentAdd,
    AppHeader,
    SimpleDataTable,
    FolderIcon,
    FolderComponent,
  },
  data() {
    return {
      columns: {
        documentId: "Certificate ID",
        documentOwner: "Certificate Owner",
        time: "Created Date",
        status: "Printed",
        documentDescription: "Purpose",
      },
      documents: [],
      hasDocument: true,
      folders: ["Work", "Personal", "Students"],
      pdfSrc: "/Real.pdf",
      isDocs: false,
      dialog: false,
      document: undefined,
      file: null,
    };
  },
  methods: {
    openDoc(document) {
      console.log(this.documents);
      this.$router.push(
        `/${this.$route.meta.userAccessed}/document-details/${document.documentCid}/${document.documentId}`
      );
    },
    updateDocFunction() {
      if (!this.file) return;

      this.$store.dispatch("updateDocument", {
        file: this.file,
        identification: this.document.documentId,
      });
      this.dialog = false;
    },
    updateDoc(document) {
      (this.document = document), (this.dialog = true);
    },
    onChanges(e) {
      this.file = e.target.files[0];
    },
    async retrieveFiles() {
      this.$store.dispatch("clearDocuments");
      this.$store.dispatch("setLoadingStatus", true);
      this.$store.dispatch("fetchAllDocuments").then(() => {
        this.$store.dispatch("setLoadingStatus", false);
        this.documents = this.$store.getters.getAllDocuments;
        if (this.documents?.length > 0) this.isDocs = true;
      });
    },
  },
  async created() {
    await this.retrieveFiles();
  },
};
</script>

<style scoped></style>
