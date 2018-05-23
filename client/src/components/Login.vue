<template>
  <div class="login">

    <a class="waves-effect waves-light modal-trigger" href="#modal2">Sign In</a>

    <!-- Modal Structure -->
    <div id="modal2" class="modal">
      <div class="modal-content">
        <h4>Sign In</h4>

        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">email</i>
                <input id="icon_email_reg" type="text" class="validate" v-model="email_login">
                <label for="icon_email_reg">Email</label>
              </div>
              <div class="input-field col s12">
                <i class="material-icons prefix">android</i>
                <input id="icon-password_reg" type="password" class="validate" v-model="password_login">
                <label for="icon-password">Password</label>
              </div>
              <small style="color:grey">Psst..The form can be quite hard to click. Maybe you should use 'tab' on your keyboard instead..</small>
            </div>
          </form>
        </div>

      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn #eceff1 blue-grey lighten-5 black-text logo">Cancel</a>
        <a class="modal-close waves-effect waves-green btn black" @click="signin">Sign In</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email_login: '',
      password_login: ''
    }
  },
  created () {
  },
  props: {
  },
  components: {
  },
  methods: {
    signin () {
      let obj = {
        email: this.email_login,
        password: this.password_login,
      }
      this.$store.dispatch('signin', obj)
      this.email_login = ''
      this.password_login = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Barlow+Condensed|Monoton|Pacifico');

.login {
  color: black;
}

/* .logo {
  color: #009900;
}

.logo-bg {
  background-color: #009900;
} */

.modal-content, .row, .check { padding-bottom: 0px; margin-bottom: 0px; }

.modal { height: 350px !important }

.btn { margin-left: 10px !important; margin-right: 10px !important; }


</style>
