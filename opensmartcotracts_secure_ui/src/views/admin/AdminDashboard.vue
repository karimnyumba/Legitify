<template>
  <div
    class="bg-[url('/public/images/palette.svg')] relative items-center bg-no-repeat bg-cover flex fex-row flex-wrap gap-2 w-full px-4 justify-start shadow-gray-200 rounded-md md:h-96"
  >
    <div class="absolute left-10 top-10 font-bold text-gradient text-xl">
      {{ user_Type?.toUpperCase() }}
    </div>
    <div
      class="absolute w-64 h-64 mr-32 left-[50%] top-52 rounded-full border border-green-400 bg-white flex items-center justify-center"
    >
      <v-img
        src="@/assets/images/download.png"
        class="hover:cursor-pointer w-[50%] h-[50%]"
      />
    </div>
  </div>
  <div>
    <div class="flex flex-row flex-wrap gap-4 mt-28">
      <v-card class="w-1/4 h-56" :key="index" v-for="(card, index) in cards">
        <v-card-title
          class="text-xl font-bold bg-secondary-content text-secondary-background h-12"
          >{{ card.name }}</v-card-title
        >

        <v-card-text
          class="flex justify-center items-center text-5xl font-extrabold h-40"
        >
          {{ card.number }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AdminDashboard",
  props: {},
  components: {},
  data() {
    return {
      cards: [
        {
          name: "Users",
          number: 1,
          color: "",
        },
        {
          name: "Documents",
          number: 0,
          color: "",
        },
        {
          name: "Reviews",
          number: 16,
          color: "",
        },
      ],
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

  created() {
    this.user = this.$store.getters.getCurrentUser;
    console.log(this.user);
  },
};
</script>

<style scoped></style>
