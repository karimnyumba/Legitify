<!-- @format -->

<template>
  <!--	<navBar/>-->


  <v-dialog
      v-model="dialog"
      width="500"
  >
    <div class="rounded-lg bg-white" style="width: 600px !important;">
      <DialogHeader class="!w-full" title="Add Organization" :dialog="dialog" @dialog="onCloseDialog"></DialogHeader>

      <dynamic-form
          :form="OrgarnizationAddFields"
          @submitted="addInstitution"
          @error="processErrors"
      />
      <button submit="true" :form="OrgarnizationAddFields.id" class="btn-submit btn-submit-right">Submit</button>


    </div>
  </v-dialog>
  <v-btn class="btn-outline" @click="dialog = true">
    <v-icon left>mdi-plus</v-icon>
    Add Institution
  </v-btn>
</template>

<script>
import navBar from "../../../components/shared/sidebar2.vue"
import DialogHeader from "@/components/shared/DialogHeader";
import {OrgarnizationAddFields} from "@/views/admin/Organizations/OrgranizationAddFields";

export default {
  name: "OrganizationAdd",
  props: {
    allOrganizations: []
  },
  data() {
    return {
      open: true,
      group: null,
      institutionName: "",
      walletAddress: "",
      location: "",
      organisations: [],
      dialog: false,
      OrgarnizationAddFields
    }
  },
  components: {
    DialogHeader,
    navBar
  },
  methods: {
    async connectWallet() {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({method: "eth_requestAccounts"});
      } else {
        console.log("no wallet connected");
      }
    },

    onCloseDialog(value) {
      this.dialog = value
    },
    processErrors(err = 'error') {
      alert(JSON.stringify(err))
    },

    async addInstitution(institutionData) {
      this.$store.dispatch('addOrganization', institutionData)
    }

  }


};
</script>

<style scoped>

</style>
