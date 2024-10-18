<template>
  <div class="my-4">
    <table class="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <thead class="text-white bg-gradient">
        <tr>
          <th class="px-6 py-3 text-left cursor-pointer" @click="sort('index')">
            No
            <span v-if="sortKey === 'index'">
              {{ sortOrder === "asc" ? "▲" : "▼" }}
            </span>
          </th>
          <th
            v-bind:key="index"
            class="px-6 py-3 text-left cursor-pointer"
            v-for="(column, index) in columns"
            @click="sort(column)"
          >
            {{ column }}
            <span v-if="sortKey === column">
              {{ sortOrder === "asc" ? "▲" : "▼" }}
            </span>
          </th>
          <th v-if="hasActions" class="px-6 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody v-if="sortedData?.length">
        <tr
          v-bind:key="index"
          v-for="(data, index) in sortedData"
          :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
          class="hover:bg-gray-200 border-b border-gray-200"
        >
          <td class="px-6 py-4">{{ index + 1 }}</td>
          <td
            v-bind:key="index"
            class="px-6 py-4"
            v-for="(key, index) in Object.keys(columns)"
          >
            {{ data[key] }}
          </td>
          <td v-if="hasActions" class="px-6 py-4">
            <slot name="actions" v-bind:data="data"></slot>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="!sortedData?.length">
        <tr class="h-64">
          <td colspan="100%" class="px-6 py-4 text-center text-gray-500">
            No data found
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: "SimpleDataTable",
  props: {
    columns: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    hasActions: {
      type: Boolean,
      default: false,
    },
    hasData: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sortKey: "",
      sortOrder: "asc",
    };
  },
  computed: {
    sortedData() {
      return this.tableData.slice().sort((a, b) => {
        if (this.sortKey) {
          let modifier = this.sortOrder === "asc" ? 1 : -1;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return 0;
        }
        return this.tableData;
      });
    },
  },
  methods: {
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },
  },
};
</script>

<style scoped></style>
