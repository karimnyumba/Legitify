<template>
  <div class="flex flex-col">
    <AppHeader title="Institution Users"></AppHeader>
    <div
      class="bg-[url('/public/images/palette.svg')] bg-cover h-40 bg-no-repeat shadow-gray-400 py-6 rounded-md mt-5"
    >
      <div class="px-2">
        <UserAdd />
      </div>
    </div>

    <div class="my-2">
      <simple-data-table
        class="h-full"
        :columns="columns"
        :table-data="users"
        :hasData="isDocs"
      >
      </simple-data-table>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/shared/AppHeader";
import UserAdd from "@/views/institution/Users/UserAdd";
import SimpleDataTable from "@/components/shared/SimpleDataTable";
import { mapState } from "vuex";

export default {
  name: "UsersList",
  components: { SimpleDataTable, UserAdd, AppHeader },
  data() {
    return {
      users: [],
      org_Name: "",
      columns: {
        name: "Name",
        userAddress: "Address",
        position: "Position",
      },
      isDocs: false,
    };
  },
  computed: {
    ...mapState({
      user_Addres: (state) => state.UserStore.logeInUser.user_Addres,
      user_Type: (state) => state.UserStore.logeInUser.user_Type,
      name: (state) => state.UserStore.logeInUser.name,
      org_Name: (state) => state.UserStore.logeInUser.org_Name,
    }),
  },
  async mounted() {
    this.$store.dispatch("clearUsers");
    this.$store.dispatch("setLoadingStatus", true);
    const currentUser = await this.$store.getters.getCurrentUser;

    this.$store
      .dispatch("fetchAllUsers", { organisationName: currentUser.org_Name })
      .then(() => {
        this.$store.dispatch("setLoadingStatus", false);
        this.users = this.$store.getters.getAllUsers;
        console.log(this.users);
        if (this.users?.length > 0) this.isDocs = true;
      });
  },
  created() {
    this.user = this.$store.getters.getCurrentUser;
  },
};
</script>

<style scoped></style>
