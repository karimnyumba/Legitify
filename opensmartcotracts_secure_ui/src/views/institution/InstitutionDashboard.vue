<template>
  <div
    class="bg-[url('/public/images/palette.svg')] relative items-center bg-no-repeat bg-cover flex fex-row flex-wrap gap-2 w-full px-4 justify-start shadow-gray-200 rounded-md md:h-96"
  >
    <div
      class="absolute w-64 h-64 mr-32 left-[50%] top-52 rounded-full border border-green-400 bg-white flex items-center justify-center"
    >
      <v-img
        src="@/assets/images/download.png"
        class="hover:cursor-pointer w-[50%] h-[50%]"
      />
    </div>
  </div>

  <div class="flex gap-2 mt-20">
    <div :key="index" v-for="(card, index) of cards" class="w-1/4 h-72">
      <v-card class="w-full h-full">
        <v-card-title
          class="text-3xl font-bold text-secondary-content flex items-center bg-gray-100 border h-16"
        >
          {{ card?.name }}
        </v-card-title>
        <v-card-text
          class="h-40 flex justify-center items-center text-secondary-content text-7xl font-extrabold"
          >{{ card?.number }}</v-card-text
        >
      </v-card>
    </div>
  </div>

  <div class="bg-gray-200 rounded-md h-[540px] mt-6">
    <div class="flex justify-between bg-gray-100 p-2 border">
      <input
        placeholder="Search"
        class="w-1/4 rounded-md py-1 px-4 bg-gray-300"
      />

      <div class="flex flex-row border">
        <v-btn-group>
          <v-btn active="true" class="">weekly</v-btn>
          <v-btn>Mothly</v-btn>
          <v-btn>Yearly</v-btn>
        </v-btn-group>
      </div>
    </div>
    <div class="flex gap-2 h-[470px]">
      <div class="h-full w-1/2 border rounded-md shadow-sm px-4 py-2">
        <canvas id="acquisitions"></canvas>
      </div>

      <div class="h-full w-1/2 border rounded-md shadow-sm px-4 py-2">
        <canvas id="acquisition"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import { mapState } from "vuex";
export default {
  name: "InstitutionDashboard",
  props: {},
  components: { Chart },
  data() {
    return {
      cards: [
        {
          name: "Operators",
          number: null,
          color: "",
        },
        {
          name: "Documents",
          number: null,
          color: "",
        },
      ],
      users: [],
      documents: [],
    };
  },
  methods: {
    async chart() {
      const data = [
        { year: "January", count: 1 },
        { year: "February", count: 20 },
        { year: "March", count: 5 },
        { year: "April", count: 25 },
        { year: "May", count: 22 },
        { year: "June", count: 0 },
        { year: "August", count: 0 },
        { year: "September", count: 0 },
        { year: "October", count: 0 },
        { year: "November", count: 0 },
        { year: "December", count: 0 },
      ];

      const data2 = [
        { year: "Monday", count: 1 },
        { year: "Tuesday", count: 20 },
        { year: "Wednesday", count: 5 },
        { year: "Thursday", count: 25 },
        { year: "Friday", count: 22 },
        { year: "Saturday", count: 0 },
        { year: "Sunday", count: 0 },
      ];

      new Chart(document.getElementById("acquisitions"), {
        type: "bar",
        data: {
          labels: data.map((row) => row.year),
          datasets: [
            {
              label: "Document share Monthly",
              data: data.map((row) => row.count),
            },
          ],
        },
      });

      new Chart(document.getElementById("acquisition"), {
        type: "line",
        data: {
          labels: data2.map((row) => row.year),
          datasets: [
            {
              label: "Document share Weekly",
              data: data2.map((row) => row.count),
            },
          ],
        },
      });
    },
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
      .dispatch("fetchAllUsers", { organisationName: currentUser?.org_Name })
      .then(() => {
        this.$store.dispatch("setLoadingStatus", false);
        this.users = this.$store.getters.getAllUsers;
        this.cards[0].number = this.users?.length || 0;
      });

    this.$store.dispatch("clearDocuments");
    this.$store.dispatch("setLoadingStatus", true);
    this.$store.dispatch("fetchAllDocuments").then(() => {
      this.$store.dispatch("setLoadingStatus", false);
      this.documents = this.$store.getters.getAllDocuments;
      this.cards[1].number = this.documents?.length || 0;
    });

    this.chart();
  },

  // async created() {
  //   await this.chart();
  // },
};
</script>

<style scoped></style>
