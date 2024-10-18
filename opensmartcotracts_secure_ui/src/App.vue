<template>
  <div class="static">
    <v-app class="bg-slate-50">
      <v-main>
        <router-view />
      </v-main>
    </v-app>
    <div
      class="absolute top-0 right-0 backdrop-blur-sm flex flex-col justify-center items-center w-full !h-full"
      v-if="isLoading"
    >
      <div
        class="animate-spin bg-primary2fade p-6 shadow-lg h-2 rounded-full bg-gradient"
      ></div>
      <span class="text-primary2 font-bold my-2">Please wait... </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({}),
  // computed: mapState(['isLoading'])
};
</script>
