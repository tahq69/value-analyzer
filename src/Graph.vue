<template>
  <canvas id="graph-canvas" width="800px" height="800px"></canvas>
</template>

<script>
  export default {
    name: 'graph-canvas',

    data () {
      return {
        context: {}
      }
    },

    mounted () {
      this.context = this.$el.getContext('2d')
      this.context.beginPath()
      this.context.moveTo(0, 0)
      this.context.lineTo(300, 150)
      this.context.stroke()
    }
  }
</script>