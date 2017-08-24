<template>
  <div id="app">
    <div>
      <div>Point count: <input v-model="count"/></div>
      <p>Max diff: {{ diff }}</p>
    </div>
    <graph :diff.sync="diff" :count="countInt"></graph>
  </div>
</template>

<script>
  import Graph from './Graph.vue'

  export default {
    name: 'app',

    data () {
      return {
        diff: 0,
        count: 100
      }
    },

    computed: {
      countInt () {
        let result = parseInt(this.count) || 100
        return result < 100 ? 100 : (result > 5000 ? 5000 : result)
      }
    },

    components: {Graph}
  }
</script>

<style>
  #app {
    width: 1030px;
    margin: 20px auto;
  }
</style>
