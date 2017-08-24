<template>
  <canvas id="graph-canvas" :width="width + 'px'" :height="height + 'px'">
  </canvas>
</template>

<script>
  import sourceData from './source-data'

  export default {
    name: 'graph-canvas',

    props: ['count'],

    data () {
      return {
        context: {},
        records: [],
        max: {},
        min: {},
        diff: 0,
        width: 1020,
        height: 820
      }
    },

    mounted () {
      this.context = this.$el.getContext('2d')
      this.redraw()
    },

    methods: {
      calculateMaxDiff () {
        this.diff = 0
        let results = this.records.reduce((acc, value, index, arr) => {
          const restOfArr = arr.slice(index + 1)
          const max = this.getMax(restOfArr)

          if (max.value - value > this.diff) {
            this.diff = max.value - value
            max.index += index + 1
            acc.push({min: {index, value}, max, diff: this.diff})
          }

          return acc
        }, [])

        const {max, min} = results.filter(value => value.diff === this.diff)[0]
        this.max = max
        this.min = min

        return 0
      },

      getMax (arr) {
        let max = {value: -Infinity, index: -1}

        arr.forEach((value, index) => {
          if (value > max.value) {
            max = {index, value}
          }
        })

        return max
      },

      xCoord (index) {
        return 10 + (index * (1000 / this.count))
      },

      yCoord (value) {
        return -(-810 + value)
      },

      redraw () {
        this.clearDraw()

        this.records = sourceData(this.count, 40)
        this.calculateMaxDiff()
        this.$emit('update:diff', this.diff)

        this.drawChart()
        this.drawPoint(this.max.index, this.max.value, 'rgba(63, 191, 127, 0.7)')
        this.drawPoint(this.min.index, this.min.value, 'rgba(63, 191, 191, 0.7)')
      },

      drawPoint (index, value, colour = 'rgba(0, 0, 255, 0.5)') {
        let x = this.xCoord(index)
        let y = this.yCoord(value)

        this.context.beginPath()
        this.context.arc(x, y, 7, 0, 2 * Math.PI)
        this.context.fillStyle = colour
        this.context.fill()
        this.context.stroke()
      },

      drawChart () {
        this.context.beginPath()
        this.context.moveTo(10, this.records[0])
        this.records.map((value, index) => {
          if (index === 0) {
            return
          }
          this.context.lineTo(this.xCoord(index), this.yCoord(value))
        })
        this.context.stroke()
      },

      clearDraw () {
        this.context.clearRect(0, 0, this.width, this.height)
      }
    },

    watch: {
      count () {
        this.redraw()
      }
    }
  }
</script>