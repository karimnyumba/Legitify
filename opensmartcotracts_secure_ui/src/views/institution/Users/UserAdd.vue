<!-- @format -->

<template>
  <div class="flex flex-col">
    <v-dialog v-model="dialog" width="500">
      <div class="rounded-lg bg-white" style="width: 600px !important">
        <DialogHeader
          class="!w-full"
          title="Add User"
          :dialog="dialog"
          @dialog="onCloseDialog"
        ></DialogHeader>

        <dynamic-form
          :form="UserAddFields"
          @submitted="addUser"
          @error="processErrors"
        />
        <button
          submit="true"
          :form="UserAddFields.id"
          class="btn-submit btn-submit-right"
        >
          Submit
        </button>
      </div>
    </v-dialog>
    <div class="flex flex-row justify-end">
      <v-btn class="btn-outline grow-0" @click="dialog = true">
        <v-icon left>mdi-account-plus</v-icon>
        Add User
      </v-btn>
    </div>
  </div>
</template>

<script>
import emitter from "tiny-emitter/instance";

import { UserAddFields } from "@/views/institution/Users/UserAddFields";
import { notifyFormValidationError } from "@/services/notificationService";
import DialogHeader from "@/components/shared/DialogHeader";
import { getSignerContract } from "@/interfaces/global.interface";

export default {
  name: "UserAdd",
  data() {
    return {
      open: true,
      dialog: false,
      UserAddFields,
    };
  },
  components: { DialogHeader },
  methods: {
    async connectWallet() {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else {
        console.log("no wallet connected");
      }
    },
    onCloseDialog() {
      this.dialog = false;
    },
    async processErrors() {
      await notifyFormValidationError();
    },
    async addUser(userData) {
      this.$store.dispatch("addUser", userData);
    },

    async institutionLogin() {
      const contract = (await getSignerContract()).contract;
      const signer = (await getSignerContract()).signer;
      const orgs = await contract.testingAddress(signer.getAddress());
      return orgs;
    },
  },

  async created() {
    emitter.on("orgsData", (evt) => {
      this.orgs = evt.organisation;
    });

    this.orgs = await this.institutionLogin();
  },
};
</script>

<style scoped></style>
