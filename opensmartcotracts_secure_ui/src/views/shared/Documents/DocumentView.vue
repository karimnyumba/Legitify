<template>
  <!--  <pdf-viewer ></pdf-viewer>-->
  <div>
    <app-header :title="documentName"> </app-header>
    <div>VerifyDocument</div>
    <pdf-viewer
      v-if="documentData != null"
      :pdf-src="documentData"
    ></pdf-viewer>
  </div>
</template>

<script>
import PdfViewer from "@/components/shared/PdfViewer.vue";
import { ipfsGateway } from "../../../../secDocConstants";
import AppHeader from "@/components/shared/AppHeader.vue";
import { decodeText, getBinaryFromBase64 } from "@/interfaces/global.interface";

export default {
  name: "DocumentView",
  components: { AppHeader, PdfViewer },
  data() {
    return {
      documentData: null,
      documentName: "",
    };
  },
  mounted() {
    this.documentName = decodeText(this.$route.params.documentName);
    this.documentData = ipfsGateway + this.$route.params.cid;
    const request = new XMLHttpRequest();
    request.open("GET", this.documentData, true);
    request.responseType = "blob";
    request.onload = function () {
      const reader = new FileReader();
      reader.readAsDataURL(request.response);
      reader.onload = function (e) {
        this.documentData = getBinaryFromBase64(e.target.result);
      };
    };
    request.response;
    request.send();
  },
};
</script>

<style scoped></style>
