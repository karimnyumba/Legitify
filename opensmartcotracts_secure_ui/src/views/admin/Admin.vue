<template>
  <div>
    <nav>
      <v-navigation-drawer v-model="open" class="">
        <div class="w-full bg-[#e9ebef] flex justify-center">
          <v-img
            width="100"
            height="100"
            src="@/assets/images/ newlg.jpg"
            class="hover:cursor-pointer"
          />
        </div>
        <NavigationLinks :menu="menu"></NavigationLinks>
      </v-navigation-drawer>
      <v-toolbar class="bg-primary2 text-white" flat>
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click.stop="open = !open"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="text-2xl font-bold">Legitify</v-toolbar-title>
        <v-btn router to="/" icon>
          <v-icon router to="/">mdi-logout</v-icon>
        </v-btn>
      </v-toolbar>
    </nav>
    <div class="p-2">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import SidebarImage from "@/components/shared/sidebarImage.vue";
import Logo from "@/components/icons/logo.vue";
import NavigationLinks from "@/components/shared/NavigationLinks.vue";
import { mapState } from "vuex";

let menu = [
  {
    name: "Dashboard",
    icon: "dashboard",
    route: "/admin/dashboard",
  },
  {
    name: "Institutions",
    icon: "institution",
    route: "/admin/institutions",
  },
  {
    name: "Settings",
    icon: "setting",
    route: "/admin/settings",
  },
];
export default {
  name: "adminView",
  data() {
    return {
      menu,
      open: true,
      group: null,
      instname: "",
      walletAddress: "",
      location: "",
      organisations: [],
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
  methods: {
    logout() {
      ethereum.on("chainChanged", (_chainId) => window.location.reload());
    },
  },
  components: { SidebarImage, NavigationLinks, Logo },
};
</script>
