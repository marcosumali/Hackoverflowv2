<template>
  <div id="app">
    <div id="nav">
      
      <div v-if="authStatus == 'true'">
        <nav>
          <div class="nav-wrapper black white-text">
            <a href="#!" class="brand-logo">hack<span style="font-weight:bold;">Overflow</span></a>
            <ul id="nav-mobile" class="left hide-on-med-and-down" style="margin-left:130px;">
              <li><a><router-link :to="{ path: '/' }"><li>Questions</li></router-link></a></li>
            </ul>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <!-- <li><Register /></li> -->
              <!-- <li><Login /></li> -->
              <li><a href="" @click="signout">Sign Out</a></li>
            </ul>
          </div>
        </nav>

        <ul class="sidenav" id="mobile-demo">
          <li><a><router-link :to="{ path: '/' }"><li>Questions</li></router-link></a></li>
          <hr>
          <!-- <li><a><Register /></a></li> -->
          <!-- <li><a><Login /></a></li> -->
          <li><a href="" @click="signout">Sign Out</a></li>
        </ul>
      </div>
      <div v-else>
        <nav>
          <div class="nav-wrapper black white-text">
            <a href="#!" class="brand-logo">hack<span style="font-weight:bold;">Overflow</span></a>
            <ul id="nav-mobile" class="left hide-on-med-and-down" style="margin-left:130px;">
              <li><a @click="removeSingle"><router-link :to="{ path: '/' }"><li>Questions</li></router-link></a></li>
            </ul>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li><Register /></li>
              <li><Login /></li>
              <!-- <li><a href="">Sign Out</a></li> -->
            </ul>
          </div>
        </nav>

        <ul class="sidenav" id="mobile-demo">
          <li><a><router-link :to="{ path: '/' }"><li>Questions</li></router-link></a></li>
          <hr>
          <li><a class="waves-effect waves-light logo" style=""><router-link :to="{ path: '/mauth' }"><li>Sign Up</li></router-link></a></li>
          <li><a class="waves-effect waves-light logo" style=""><router-link :to="{ path: '/mauth' }"><li>Sign In</li></router-link></a></li>
          <!-- <li><a><Register /></a></li> -->
          <!-- <li><a><Login /></a></li> -->
          <!-- <li><a href="">Sign Out</a></li> -->
        </ul>
      </div>

    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=PT+Sans|Roboto|Roboto+Condensed|Tajawal');

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  /* font-family: 'Tajawal', sans-serif; */
  /* font-family: 'Roboto', sans-serif; */
  /* font-family: 'Roboto Condensed', sans-serif; */
  font-family: 'PT Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}
#nav {
  padding: 10px;
}

.brand-logo {
  padding-left: 10px !important;
}

#nav a {
  font-size: 20px;
  /* font-weight: bold; */
  /* color: #2c3e50; */
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
}

hr, .answers {
  margin-left: 20px;
  margin-right: 20px;
}

.sidenav {
  width: 160px;
}

</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Register,
    Login
  },
  computed: {
    ...mapState([
      'authStatus',
    ])
  },
  methods: {
    signout () {
      localStorage.removeItem('authkey')
      localStorage.removeItem('authStatus')
      alertify.success(`Sign out successful :D`);
      alertify.success(`You'll be redirected to our home page in a few seconds..`);
      setTimeout(() => { this.$router.push('/') }, 2000);
    },
    removeSingle () {
      this.$store.commit('removeSingle')
    }
  }
}
</script>