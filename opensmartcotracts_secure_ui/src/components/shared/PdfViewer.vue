<template>
  <div>
    <h2 v-if="title" class="font-bold dashed-border">
      {{ title }}
    </h2>

    <div class="flex flex-column justify-center items-center">
      <div class="flex flex-row justify-center">
        <button
          class="px-3 py-1 bg-primary2 text-white mx-2 rounded-md hover:bg-primary2"
          :class="changePageCheck('prev')"
          v-on:click="prevPage"
        >
          Prev
        </button>
        <span class="px-3 py-1">
          <span class="font-bold">{{ currentPage }}</span
          >/<span class="text-sm">{{ numPages }}</span>
        </span>
        <button
          class="px-3 py-1 bg-primary2 text-white mx-2 rounded-md hover:bg-primary2"
          v-on:click="nextPage"
          :class="changePageCheck('next')"
        >
          Next
        </button>
      </div>
      <pdf
        :src="pdfSrc"
        :page="currentPage"
        class="border-1 border-gray-200 px-2 container border-gradient shadow-sm"
        style="margin: 10px auto"
        :scale="scale"
      >
      </pdf>
      <!--      <div class="flex flex-row justify-center">-->
      <!--        <button class="px-3 py-1 bg-primary2 text-white mx-2 rounded-md-->
      <!--              hover:bg-primary2"-->
      <!--                :class="changePageCheck('prev')" v-on:click="prevPage">-->
      <!--          Prev-->
      <!--        </button>-->
      <!--        <span class="px-3 py-1">-->
      <!--          <span class="font-bold">{{ currentPage }}</span>/<span class="text-sm">{{ numPages }}</span>-->
      <!--        </span>-->
      <!--        <button class="px-3 py-1 bg-primary2 text-white mx-2 rounded-md-->
      <!--              hover:bg-primary2" v-on:click="nextPage"-->
      <!--                :class="changePageCheck('prev')" >-->
      <!--          Next-->
      <!--        </button>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import pdf from "pdfvuer";
import { createLoadingTask } from "pdfvuer";

export default {
  name: "PdfViewer",
  components: {
    pdf,
  },
  props: {
    pdfSrc: String,
    title: String,
  },
  data() {
    return {
      currentPage: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: [],
      scale: "page-width",
    };
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.numPages) this.currentPage += 1;
    },
    prevPage() {
      if (this.currentPage !== 1) this.currentPage -= 1;
    },
    changePageCheck(direction) {
      if (direction === "prev" && this.currentPage <= 1)
        return "hover:cursor-not-allowed";
      else if (direction === "next" && this.currentPage === this.numPages)
        return "hover:cursor-not-allowed";
    },
  },
  mounted() {
    this.pdfdata = createLoadingTask(this.pdfSrc);
    this.pdfdata.then((pdf) => {
      this.numPages = pdf.numPages;
    });
  },
};
</script>

<style scoped></style>
