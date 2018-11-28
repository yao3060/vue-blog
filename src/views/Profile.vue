<template>
  <div class="profile container">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">

        <div class="card">

          <div class="card-header">
            Profile Page
          </div>

          <div class="card-body">


            <form>

              <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control-plaintext" id="name" :value="user.name" readonly>
                </div>
              </div>

              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                  <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="user.email">
                </div>
              </div>

              <div class="form-group row">
                <label for="Description" class="col-sm-2 col-form-label">Description</label>
                <div class="col-sm-10">
                  <input type="text" readonly class="form-control-plaintext" id="Description" :value="user.description">
                </div>
              </div>

            </form>


          </div>

        </div>


      </div>
    </div>
  </div>
</template>

<script>
    import AuthUser from '../store/modules/auth-user'
    export default {
      name: "Profile",
      data() {
          return {
            user: AuthUser.state
          }
      },
    }
</script>

<style scoped>

</style>
