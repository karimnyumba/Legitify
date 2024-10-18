<template>
  <div>
    <div
      v-for="(item, index) in menu"
      :key="index"
      :class="[
        'px-4  py-2 my-1 rounded-sm hover:cursor-pointer slide-left font-semibold',
        isActive(item.route)
          ? 'bg-secondary-focus/40 text-primary2 mx-1 rounded-md'
          : 'hover:bg-gray-200 text-primary2 mx-1 rounded-md',
      ]"
      @click="navigate(index)"
    >
      <div class="flex flex-row p-1 justify-start items-center w-full">
        <Icon
          width="w-6"
          height="h-6"
          :name="item.icon"
          :class="[
            'grow-0 border-2 rounded-full p-1',
            isActive(item.route)
              ? 'border-0'
              : 'border-primary2 hover:border-primary2',
          ]"
        />
        <div
          :class="[
            'grow px-1 font-semibold text-lg',
            isActive(item.route) ? 'text-white' : 'text-primary2',
          ]"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./Icon.vue";

export default {
  name: "NavigationLinks",
  components: {
    Icon,
  },
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
  },
  methods: {
    navigate(index) {
      this.$router.push(this.menu[index].route);
    },
    isActive(route) {
      return this.currentRoute === route;
    },
  },
};
</script>
