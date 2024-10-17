<template>
  <div class="flex gap-1">
    <div
      class="w-10 flex justify-center items-center text-white text-sm font-semibold bg-gray-400"
    >
      D/T
    </div>
    <div class="flex flex-grow gap-1">
      <div
        v-for="data in time"
        :key="data"
        class="bg-[#37adde] flex justify-center items-center text-white font-semibold flex-grow h-8"
      >
        {{ data }}
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-1 my-1">
    <div
      v-for="data in days"
      :key="data"
      class="border border-gray-300 shadow-sm rounded-sm flex h-36"
    >
      <div
        class="w-10 h-full bg-[#37adde] flex justify-center items-center text-white font-bold"
      >
        <div class="-rotate-90 text-sm">{{ data }}</div>
      </div>
      <div class="flex flex-grow h-full bg-green-50 m-1">
        <div
          v-for="data in exams"
          :key="data"
          class="w-80 h-full bg-gray-400 flex flex-col p-2 rounded-md"
        >
          <div
            class="bg-gray-100 rounded-xl py-1 px-4 w-14 text-xs flex justify-center text-gray-500 items-center font-semibold"
          >
            {{ data.code }}
          </div>
          <p class="text-xs text-white font-normal">{{ data.name }}</p>
          <p class="text-sm text-white font-semibold">{{ data.date }}</p>
          <p class="text-xs text-white font-normal">{{ data.time }}</p>
          <p class="text-sm text-white font-semibold">{{ data.venue }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="flex gap-1">
    <div
      class="w-10 flex justify-center items-center text-white text-sm font-semibold bg-gray-400"
    >
      D/T
    </div>
    <div class="flex flex-grow gap-1">
      <div
        v-for="data in time"
        :key="data"
        class="bg-[#37adde] flex justify-center items-center text-white font-semibold flex-grow h-8"
      >
        {{ data }}
      </div>
    </div>
  </div>
  <div class="h-[500px] w-ful m-5 p-2 flex justify-center items-center">
    <v-progress-circular
      :size="100"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Settings",
  components: {},
  data() {
    return {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      time: ["1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", "9-10"],
      exams: [
        {
          code: "IS132",
          name: "Computer whatever",
          date: "Jul 13, 2024",
          time: "7:30-10:30",
          venue: "Yombo 4",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped></style>
