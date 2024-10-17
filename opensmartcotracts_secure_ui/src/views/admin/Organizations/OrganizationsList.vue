<template>
  <app-header title="Institutions"></app-header>

  <div class="flex flex-row justify-end mb-4">
    <OrganizationsAdd></OrganizationsAdd>
  </div>

  <div class="row">
    <div
      v-for="organization of organisations"
      :key="organization.orgAddress"
      class="col-md-4"
    >
      <div
        class="hover:bg-gray-100 hover:cursor-pointer my-2 slide-left flex flex-col rounded-md border p-4 shadow-sm border-gray-100"
      >
        <div class="text-primary2 flex justify-between">
          <div class="flex gap-2 items-center">
            <span
              class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold"
              >{{ organization.orgName.substring(0, 2) }}</span
            >
            <span class="font-bold text-sm">{{ organization.orgName }}</span>
          </div>
          <div class="items-center flex">
            <span class="text-gray-700 text-sm">{{
              organization.officeLocation
            }}</span>
          </div>
        </div>
        <div class="flex mt-2 py-2">
          <div class="flex items-center gap-2 p-2 bg-gray-100 rounded-sm">
            <span class="font-semibold text-primary2">Wallet: </span>
            <span
              class="hover:text-green-700 hover:cursor-pointer hover:text-bold text-sm"
              >{{ organization.orgAddress }}</span
            >
          </div>
        </div>

        <div class="flex justify-end">
          <span
            class="px-8 py-1 bg-gradient rounded-sm text-white font-semibold text-base"
            >EDIT
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/shared/AppHeader";
import OrganizationsAdd from "@/views/admin/Organizations/OrganizationsAdd";

export default {
  name: "OrganizationList",
  components: { AppHeader, OrganizationsAdd },
  data() {
    return {
      open: true,
      group: null,
      organisations: [],
      organizationAdd: false,
    };
  },

  async created() {
    this.$store.dispatch("clearOrganizations");
    this.$store.dispatch("setLoadingStatus", true);
    this.$store.dispatch("fetchAllOrganizations").then(() => {
      this.organisations = this.$store.getters.getAllOrganizations;
      this.$store.dispatch("setLoadingStatus", false);
    });
  },
};
</script>
