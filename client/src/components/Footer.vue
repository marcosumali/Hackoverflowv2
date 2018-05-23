<template>
  <div class="footer">

    <footer class="animated fadeIn">
      <a href="http://www.madebybastian.com/" style="color:white" target="_blank">© 2018 madebybastian.com</a>
    </footer>

  </div>
</template>

<style scoped>

footer {
  background-color: black;
  margin-top: 31px;
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: bold;
  text-align: center;
}

</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Footer',
  components: {
    HelloWorld
  }
}
</script>
