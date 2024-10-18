<template>
  <nav>
    <v-navigation-drawer v-model="open" class="">
      <SidebarImage></SidebarImage>
      <NavigationLinks :menu="menu"></NavigationLinks>

      <!-- <v-list nav dense class="coll">
				<v-list-item-group class="px-4 mx-2">
					<v-list-item class="list-item py-5 my-5" router to="admin">
						<v-list-item-title>
							<v-icon>mdi-domain</v-icon>
							<button class="ps-4 text" router to="admin" style="font-size:15px">Add Organisation</button>
						</v-list-item-title>
					</v-list-item>
					<v-list-item class="list-item pb-5 mb-5" router to="view" flat>
						<v-list-item-title router to="view">
							<v-icon>mdi-eye </v-icon>
							<button 
                            	@click="getOrganisation"
								class="ps-4 text"
								style="font-size: 15px"
								flat
                             >View Organisations</button>
						</v-list-item-title>
					</v-list-item>
					 
				</v-list-item-group>
			</v-list> -->

      <router-view></router-view>
    </v-navigation-drawer>
    <v-toolbar class="" flat>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="open = !open"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="word">Legitify</v-toolbar-title>

      <input placeholder="search" class="input form-control" />

      <v-btn router to="/" icon>
        <v-icon router to="/">mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import NavigationLinks from "./NavigationLinks.vue";
import SidebarImage from "./sidebarImage.vue";
let menu = [
  {
    name: "Institutions",
    icon: "institution",
    route: "/institutions",
  },
  {
    name: "Settings",
    icon: "setting",
    route: "/",
  },
];
export default {
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
  methods: {
    logout() {
      ethereum.on("chainChanged", (_chainId) => window.location.reload());
    },
  },
  components: { SidebarImage, NavigationLinks },
};
</script>
<style scoped>
.unit-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.div-card {
  background: #ffffff;
  box-shadow: 0px 4px 0px 7px #cff2fe;
}

.end-pos {
  display: flex;
  justify-content: flex-end;
}

.word {
  color: #095073;
  font-size: large;
}
</style>
