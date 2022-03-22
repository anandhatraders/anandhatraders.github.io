<template>
  <div class="form-container">
    <form method="POST" @submit.prevent="signup" role="form">
      <input id="step2" type="checkbox" />
      <input id="step3" type="checkbox" />

      <div id="part1" class="form-group">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title text-center">Account Details</h3>
          </div>

          <validation-provider rules="required" v-slot="{ errors }">
            <input
              type="text"
              v-model="user_data.firstname"
              id="firstname"
              class="form-control"
              placeholder="First Name"
              aria-describedby="sizing-addon1"
            />
            <span class="required_field_false">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors }">
            <input
              type="text"
              v-model="user_data.lastname"
              id="lastname"
              class="form-control"
              placeholder="Last Name"
              aria-describedby="sizing-addon1"
            />
            <span class="required_field_false">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors }">
            <input
              type="text"
              v-model="user_data.username"
              id="username"
              class="form-control"
              placeholder="User Name"
              aria-describedby="sizing-addon1"
              minlength="4"
            />
            <span class="required_field_false">{{ errors[0] }}</span>
          </validation-provider>

          <div
            class="btn-group btn-group-lg px-3"
            role="group"
            aria-label="..."
          >
            <label for="step2" id="continue-step2" class="continue">
              <div class="btn btn-default btn-success btn-lg px-4">
                Continue
              </div>
            </label>
          </div>
        </div>
      </div>

      <div id="part2" class="form-group">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title text-center">Personal Details</h3>
          </div>
          <validation-provider rules="required" v-slot="{ errors }">
            <input
              type="email"
              v-model="user_data.email"
              id="email"
              class="form-control"
              placeholder="Email"
            />

            <span class="required_field_false">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors }">
            <input
              type="password"
              v-model="user_data.password"
              id="password"
              class="form-control"
              placeholder="Password"
              minlength="8"
            />
            <span class="required_field_false">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors }">
            <input
              type="phone"
              v-model="user_data.phone_number"
              id="phone"
              class="form-control"
              placeholder="Phone"
              minlength="10"
              maxlength="10"
            />
            <span class="required_field_false">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors }">
            <input
              type="text"
              v-model="user_data.aadhar_number"
              id="aadharcard"
              class="form-control"
              placeholder="Adhaar Number"
              minlength="12"
              maxlength="12"
            />
            <span class="required_field_false">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors }">
            <input
              type="text"
              v-model="user_data.pan_number"
              id="pannumber"
              class="form-control"
              placeholder="Pan Card Number"
              minlength="10"
              maxlength="10"
            />
            <span class="required_field_false">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors }">
            <h5 class="panel-title text-center">Date Of Birth</h5>
            <input
              type="date"
              v-model="user_data.date_of_birth"
              id="dob"
              class="form-control"
            />
            <span class="required_field_false">{{ errors[0] }}</span>
          </validation-provider>
          <div class="btn btn-lg" role="group" aria-label="...">
            <label for="step2" id="back-step2" class="back">
              <div class="btn btn-default btn-primary btn-lg" role="button">
                Back
              </div>
            </label>

            <label for="step3" id="continue-step3" class="continue">
              <div class="btn btn-default btn-success btn-lg" role="button">
                Continue
              </div>
            </label>
          </div>
        </div>
      </div>

      <div id="part3" class="form-group">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title text-center">Type Of User</h3>
          </div>
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="px-4">
              <select
                class="form-control"
                id="userType"
                v-model="user_data.user_type"
                required
              >
                <option value="cashier">Cashier</option>
                <option value="labour">Labour</option>
              </select>
            </div>
            <span class="required_field_false">{{ errors[0] }}</span>
          </validation-provider>
          <div
            class="btn-group btn-group-lg px-4 mt-2"
            role="group"
            aria-label="..."
          >
            <label for="step3" id="back-step3" class="back">
              <div class="btn btn-default btn-primary btn-lg px-4">Back</div>
            </label>
            <label class="continue">
              <button
                type="submit"
                class="btn btn-default btn-success btn-lg px-4"
              >
                Submit
              </button>
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_data: {
        password: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phone_number: null,
        aadhar_number: null,
        pan_number: "",
        date_of_birth: "",
        user_type: "",
      },
    };
  },
  methods: {
    signup: function () {
      if (this.user_data.user_type == "labour") {
        this.user_data["is_active"] = false;
      }
      this.$http
        .post(this.$store.getters.url + "/user-create", this.user_data)
        .then((data) => {
          this.$fire({
            title: "User Detail",
            text: "Added Successfully",
            type: "success",
          });
        })
        .catch((e) => {
          this.$fire({
            title: "Error",
            text: "Please Try Again will all data Added Properly",
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
body {
  text-align: center;
}

.form-container {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}
.form-container input[type="text"],
.form-container input[type="email"],
.form-container input[type="phone"],
.form-container input[type="number"],
.form-container input[type="password"],
.form-container input[type="date"],
.form-container textarea {
  width: 90%;
  margin: 20px auto;
  border: 1px solid white;
  /* box-shadow: 0 0 1px 1px white; */
}
.form-container textarea {
  min-height: 150px;
}
.form-container .panel {
  background: rgba(0, 0, 0, 0.2);
}
.form-container .panel .panel-heading {
  margin-bottom: 20px;
}
.form-container .btn-group {
  width: 90%;
  margin: 0 auto 10px auto;
}
.form-container .back {
  float: left;
}
.form-container .continue {
  float: right;
}

input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}

#part1,
#part2,
#part3 {
  z-index: 2;
  display: block;
  height: auto;
  opacity: 1;
  transition: opacity 1s ease-in-out;
}

#part2,
#part3 {
  opacity: 0;
  height: 0;
  overflow: hidden;
}

#step2:checked ~ #part2 {
  opacity: 1;
  height: auto;
}

#step2:checked ~ #part1 {
  opacity: 0;
  height: 0;
  display: none;
}

#step3:checked ~ #part3 {
  opacity: 1;
  height: auto;
}

#step3:checked ~ #part2 {
  opacity: 0;
  width: 0;
  height: 0;
}
.required_field_false {
  color: red;
}
</style>
