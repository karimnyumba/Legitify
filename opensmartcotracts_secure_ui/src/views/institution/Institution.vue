<template>
  <div>
    <nav>
      <v-navigation-drawer
        v-model="open"
        class="bg-secondary-focus/40 relative mt-2 mr-2 ml-1 rounded-md"
      >
        <div class="hover:rotate-180"><Logo :width="50" :height="80" /></div>

        <hr class="border-neutral-50" />
        <!-- <SidebarImage></SidebarImage> -->
        <NavigationLinks :menu="menu"></NavigationLinks>

        <div
          class="absolute bottom-3 text-secondary-content sm:visible w-full boder-2 border-red-100 flex justify-center"
        >
          <div
            class="bg-secondary-background shadow shadow-secondary-content rounded-md w-48 h-60 px-2"
          >
            <div class="mt-5">
              <Progress />
            </div>
            <p>75% Used</p>
            <div class="">
              <v-progress-linear
                model-value="20"
                height="6"
                rounded="2"
              ></v-progress-linear>
            </div>
            <div class="flex justify-between text-sm font-semibold">
              <p>65GB</p>
              <p>100GB</p>
            </div>

            <button
              class="my-2 bg-secondary-focus px-5 font-bold text-sm text-secondary-background rounded-sm py-[6px]"
            >
              Upgrade
            </button>
          </div>
        </div>
      </v-navigation-drawer>
      <v-toolbar
        class="bg-secondary-background flex justify-between mt-2 mx-1 rounded-md"
        flat
      >
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click.stop="open = !open"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="flex items-center gap-2">
          <p class="text-2xl font-bold">SECDOC</p>
          <p class="text-xl text-green-900 font-semibold">{{ name }}</p>
        </v-toolbar-title>

        <div class="inline-flex flex-row">
          <!-- <span class="flex items-center">UDSM</span> -->

          <v-btn router to="/" icon>
            <v-icon router to="/">mdi-logout</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
    </nav>
    <div class="p-2 mx-2 bg-gray-100 py-4 rounded-md">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SidebarImage from "@/components/shared/sidebarImage";
import Logo from "@/components/icons/logo.vue";
import NavigationLinks from "@/components/shared/NavigationLinks";
import Progress from "@/components/icons/progress.vue";
import { mapState } from "vuex";

export const menu = [
  {
    name: "Dashboard",
    icon: "dashboard",
    route: "/institution/dashboard",
  },
  {
    name: "Operators",
    icon: "people",
    route: "/institution/users",
  },
  {
    name: "Documents",
    icon: "document",
    route: "/institution/documents",
  },
  {
    name: "Settings",
    icon: "setting",
    route: "/institution/settings",
  },
];
export default {
  name: "Institution",
  components: { SidebarImage, NavigationLinks, Logo, Progress },
  computed: {
    ...mapState({
      user_Addres: (state) => state.UserStore.logeInUser.user_Addres,
      user_Type: (state) => state.UserStore.logeInUser.user_Type,
      name: (state) => state.UserStore.logeInUser.name,
      org_Name: (state) => state.UserStore.logeInUser.org_Name,
    }),
  },
  created() {
    this.user = this.$store.getters.getCurrentUser;
    console.log(this.user);
  },
  data() {
    return {
      menu,
      open: true,
    };
  },
};
</script>

<style scoped></style>
