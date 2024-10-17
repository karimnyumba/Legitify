<template>
  <div >
    <nav>
      <v-navigation-drawer v-model="open" class="">
        <SidebarImage></SidebarImage>
        <NavigationLinks :menu="menu"></NavigationLinks>
      </v-navigation-drawer>
      <v-toolbar class="bg-primary2 text-white" flat>
        <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="open = !open"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-2xl font-bold">SECDOC</v-toolbar-title>
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
import NavigationLinks from "@/components/shared/NavigationLinks.vue";

export const menu = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    route: '/operator/dashboard'
  },
  {
    name: 'Documents',
    icon: 'document',
    route: '/operator/documents'
  },
  {
    name: 'Settings',
    icon: 'setting',
    route: '/operator/settings'
  }
]

export default {
  name: "Operator",
  components: { SidebarImage, NavigationLinks },
  data() {
    return {
      menu,
      open: true,
    }
  }
}
</script>

<style scoped>

</style>