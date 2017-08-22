<template>
  <canvas id="graph-canvas" width="820px" height="800px"></canvas>
</template>

<script>
  import sourceData from './source-data'

  export default {
    name: 'graph-canvas',

    data () {
      return {
        context: {},
        records: []
      }
    },

    created () {
      this.records = sourceData()
    },

    mounted () {
      this.context = this.$el.getContext('2d')
      this.context.beginPath()

      this.context.moveTo(10, this.records[0])

      this.records.map((value, index) => {
        if (index === 0) {
          return
        }

        this.context.lineTo(10 + (index * 8), value)
      })

      this.context.stroke()
    }
  }
</script>