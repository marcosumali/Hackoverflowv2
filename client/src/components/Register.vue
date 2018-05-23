<template>
    <div class="register">

      <a class="waves-effect waves-light modal-trigger" href="#modal1">Register</a>

      <!-- Modal Structure -->
      <div id="modal1" class="modal left-arrow right-arrow">
        <div class="modal-content">
          <h4>Sign Up</h4>

          <div class="row">
            <form class="form col s12">
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">email</i>
                  <input id="icon_email" type="text" class="validate" v-model="email_register">
                  <label for="icon_email">Email</label>
                </div>
                <div class="input-field col s12">
                  <i class="material-icons prefix">android</i>
                  <input id="icon-password" type="password" class="validate" v-model="password_register">
                  <label for="icon-password">Password</label>
                </div>
                <div class="input-field col s12">
                  <i class="material-icons prefix">account_circle</i>
                  <input id="icon-name" type="text" class="validate" v-model="username">
                  <label for="icon-name">Display Name</label>
                </div>
                <small style="color:grey">Psst..The form can be quite hard to click. Maybe you should use 'tab' on your keyboard instead..</small>
              </div>
            </form>
          </div>

        </div>
        <div class="modal-footer">
          <a class="bottom modal-close waves-effect waves-green btn #eceff1 blue-grey lighten-5 black-text">Cancel</a>
          <a class="bottom modal-close waves-effect waves-green btn black" @click="signup">Join</a>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email_register: '',
      password_register: '',
      username: ''
    }
  },
  props: {
  },
  components: {
  },
  methods: {
    signup () {
      let obj = {
        email: this.email_register,
        password: this.password_register,
        username: this.username
      }
      this.$store.dispatch('signup', obj)
      this.email_register = ''
      this.password_register = ''
      this.username = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* @import url('https://fonts.googleapis.com/css?family=Barlow+Condensed|Monoton|Pacifico'); */

.register {
  color: black;
}

/* .logo {
  color: #009900;
}

.logo-bg {
  background-color: #009900;
} */

/* .modal {
    display: none;
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
}

.modal.open {
   display: flex;
   flex-direction: column;
}

.modal-header,
.modal-footer {
    height: 100px;
}

.modal-content {
    height: 100%;
    overflow-y: auto;
} */

.modal-content, .row, .check { padding-bottom: 0px; margin-bottom: 0px; }

.modal { height: 400px !important }

.btn { margin-left: 10px !important; margin-right: 10px !important; }


</style>
