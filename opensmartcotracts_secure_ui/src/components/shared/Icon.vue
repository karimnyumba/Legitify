<template>
  <div :id="iconId" v-html="getIcon(name)" v-bind:class="[width, height]">
  </div>
</template>

<script>
import {IconService} from '@/services/IconService';

export default {
  name: 'Icon',
  props: {
    width: String,
    height: String,
    color: String,
    name: {
      type: String,
      default: '#313131'
    }
  },
  data() {
    return {
      IconService,
      iconId: Date.now()
    }
  },
  methods: {
    getIcon(name = 'email') {
      let icon = IconService.email
      Object.keys(IconService).forEach((key) => {
        if (key === name) icon = IconService[key]
      })
      return icon
    }
  },
  created() {
    // prepare icon id attribute before rendering has occured
    this.iconId = this.name + '_' + this.iconId
  },
  mounted() {
    // Remove previous colors
    for (const element of document.getElementById(this.iconId).getElementsByTagName('svg')) {
      element.removeAttribute('fill')
      for (const path of element.getElementsByTagName('path')) {
        path.removeAttribute('fill')
      }
    }
    // Set new Color
    document.getElementById(this.iconId).getElementsByTagName('svg')[0].setAttribute('fill', this.color)
  }
}
</script>

