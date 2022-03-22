<template>
  <div class="main-bg">
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card shadow">
          <div class="card-title text-center border-bottom">
            <h2 class="p-3">Change Password</h2>
          </div>
          <form method="POST" @submit.prevent="updatePassword">
            <div class="card-body">
              <div class="mb-4">
                <validation-provider rules="required" v-slot="{ errors }">
                  <label for="username" class="form-label">Old Password</label>
                  <input
                    type="password"
                    v-model="user_data.old_password"
                    class="form-control"
                    id="username"
                    required
                  />
                  <span class="required_field_false">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="mb-4">
                <validation-provider rules="required" v-slot="{ errors }">
                  <label for="email" class="form-label">New Password</label>
                  <input
                    type="password"
                    v-model="user_data.password"
                    class="form-control"
                    id="email"
                    required
                  />
                  <span class="required_field_false">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="mb-4">
                <validation-provider rules="required" v-slot="{ errors }">
                  <label for="password" class="form-label"
                    >Confirm Password</label
                  >
                  <input
                    type="password"
                    v-model="user_data.password2"
                    class="form-control"
                    id="password"
                    required
                  />
                  <span class="required_field_false">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="d-grid">
                <button class="btn text-dark main-bg">SUBMIT</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_data: {
        old_password: "",
        password: "",
        password2: "",
      },
    };
  },
  methods: {
    updatePassword() {
      this.$confirm("Conform please").then(() => {
        this.$http
          .post(
            this.$store.getters.url +
              "/user-update-password/" +
              this.$route.query.public_id,
            this.user_data
          )
          .then((data) => {
            this.$fire({
              title: "Password",
              text: "Changed Successfully",
              type: "success",
            }).then((r) => {
              this.$router.push("/signout");
            });
          })
          .catch((e) => {
            this.$fire({
              title: "Error",
              text: this.message_setter(e),
              type: "error",
            });
          });
      });
    },
    message_setter(e) {
      return e.body.password ? e.body.password : e.body.old_password;
    },
  },
};
</script>

<style scoped>
.main-bg {
  background-color: #dadada;
  margin: 2% 0% 0% 0%;
}

input:focus,
button:focus {
  border: 1px solid #dadada;
  box-shadow: none;
}

.form-check-input:checked {
  background-color: #dadada;
  border-color: #dadada;
}

.card,
.btn,
input {
  border-radius: 0 !important;
}
.required_field_false {
  color: red;
}
</style>
