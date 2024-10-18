<template>
  <div class="m-2 flex flex-column">
    <div class="flex flex-row px-4 py-4">
      <div class="border-2 rounded-sm border-primary2variant-300"></div>
      <div class="flex flex-column">
        <div :key="index" v-for="(share, index) in timelineData" class="flex">
          <slot name="timeline-icon">
            <div class="h-4 w-4 mt-7">
              <svg viewBox="5 5 52 52">
                <path
                  d="m14 43.7v-35.4c0-1 1.3-1.7 2.2-0.9l21.2 17.3c0.8 0.6 0.8 1.9 0 2.5l-21.2 17.5c-0.9 0.7-2.2 0.1-2.2-1z"
                  fill="#095073"
                />
              </svg>
            </div>
          </slot>
          <div class="bg-white rounded-md w-full border my-3 slide-left">
            <div class="font-bold p-2 bg-gradient rounded-t-md">
              {{ share.time }}
            </div>
            <div class="row p-2">
              <div class="col-md-6">
                <span> From: </span>
                <span
                  class="pl-1 hover:cursor-pointer underline text-primary2 slide-left"
                >
                  {{ share.sender }}</span
                >
              </div>
              <div class="col-md-6">
                <span> To: </span>
                <span
                  class="pl-1 hover:cursor-pointer underline text-primary2 slide-left"
                >
                  {{ share.receiver }}
                </span>
              </div>
              <div class="col-md-12 md:flex md:flex-row mt-2">
                <div class="">Comment:</div>
                <div class="md:ml-2 text-primary2variant-400">
                  {{ share.comment }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  props: {
    timelineData: [Object],
  },
};
</script>

<style scoped></style>
