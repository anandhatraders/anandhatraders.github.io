<template>
  <div class="row">
    <div class="alert alert-warning" role="alert" v-if="message">
      {{ message }}
    </div>
    <h3>Users List</h3>
    <table class="table table-light table-striped">
      <thead>
        <tr>
          <th scope="col">UserName</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th scope="col">aadhar_number</th>
          <th scope="col">pan_number</th>
          <th scope="col">Staff User</th>
          <th scope="col">Active User</th>
          <th scope="col">User Type</th>
          <th scope="col">Update</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col">{{ user_data.username }}</td>
          <td class="col">{{ user_data.email }}</td>
          <td class="col">{{ user_data.phone_number }}</td>
          <td class="col">{{ user_data.aadhar_number }}</td>
          <td class="col">{{ user_data.pan_number }}</td>
          <td class="col">{{ user_data.is_staff }}</td>
          <td class="col">{{ user_data.is_active }}</td>
          <td class="col">{{ user_data.user_type }}</td>
          <td class="col"></td>
        </tr>
        <tr>
          <td class="col">
            <input type="text" v-model.lazy="user_data.username" />
          </td>
          <td class="col">
            <input type="text" v-model="user_data.email" />
          </td>
          <td class="col">
            <input type="text" v-model="user_data.phone_number" />
          </td>
          <td class="col">
            <input type="text" v-model="user_data.aadhar_number" />
          </td>
          <td class="col">
            <input type="text" v-model="user_data.pan_number" />
          </td>
          <td class="col">
            <input type="text" v-model="user_data.is_staff" />
          </td>
          <td class="col">
            <input type="text" v-model="user_data.is_active" />
          </td>
          <td class="col">
            <input type="text" v-model="user_data.user_type" />
          </td>
          <td class="col">
            <button @click="updateUser()">update</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_data: {},
      message: "",
    };
  },
  beforeMount() {
    this.$http
      .get(
        this.$store.getters.url +
          "/admin-user-update/" +
          this.$route.query.public_id
      )
      .then((data) => {
        this.user_data = data.body;
      });
  },
  methods: {
    updateUser() {
      this.$http
        .post(
          this.$store.getters.url +
            "/admin-user-update/" +
            this.$route.query.public_id,
          this.user_data
        )
        .then((data) => {
          this.message = "User Data Updated Successfully";
        })
        .catch((e) => {
          this.message = e.body;
        });
    },
  },
};
</script>

<style>
</style>
