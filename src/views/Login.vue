<template>

  <div class="login container">
    <div class="row">
      <div class="col-sm-6 offset-sm-3">

        <div class="card">

          <div class="card-header">
            Login
          </div>

          <div class="card-body">

            <form action="" method="POST" @submit.prevent="login">
              <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input v-model="username"
                       v-validate="{ required: true }"
                       type="text" name="username" class="form-control" id="exampleInputEmail1"
                       aria-describedby="emailHelp" placeholder="Enter username">
                <span class="invalid-feedback" v-show="errors.has('username')">
                  {{ errors.first('username') }}
                </span>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="password"
                       v-validate="{ required: true, min: 6 }"
                       type="password" name="password" class="form-control" id="exampleInputPassword1"
                       placeholder="Password">

                <span class="invalid-feedback" v-show="errors.has('password')">
                  {{ errors.first('password') }}
                </span>
              </div>

              <button type="submit" class="btn btn-primary btn-block">Login</button>
            </form>

          </div>

        </div>


      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {

    login() {

      this.$validator.validateAll().then((result) => {

        if (result) {
          // eslint-disable-next-line

          const formData = {
            username: this.username,
            password: this.password,
          };

          this.$store.dispatch('loginRequest', formData).then( response => {
            this.$router.push({name: 'profile'})
          });

        } else {
          alert('Correct them errors!');
        }

      });
    },
  },
};
</script>

<style scoped>

</style>
