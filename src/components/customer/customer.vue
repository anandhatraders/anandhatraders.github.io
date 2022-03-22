<template>
  <div class="row">
    <form method="post" @submit.prevent="add_customer">
      <validation-provider rules="required" v-slot="{ errors }">
        <div class="card mb-3">
          <div class="card-body">
            <h5>Add New Customer</h5>
            <div class="input">
              <input
                type="text"
                class="form-control mb-3"
                v-model="add_customer_data.customerName"
                placeholder="Customer Name"
                :class="{ required_field_false: error.customerName }"
                minlength="3"
                required
              />
              <input
                type="text"
                class="form-control mb-3"
                v-model="add_customer_data.phoneNumber"
                placeholder="Phone Number"
                :class="{ required_field_false: error.phoneNumber }"
                minlength="10"
                maxlength="10"
                required
              />
              <input
                type="text"
                class="form-control mb-3"
                v-model="add_customer_data.address"
                placeholder="Address"
                :class="{ required_field_false: error.address }"
                required
              />
              <div class="input-group-postpend">
                <button type="submit" class="btn btn-success w-100">
                  Add Customer
                </button>
              </div>
            </div>
            <span class="required_field_false">{{ errors[0] }}</span>
          </div>
        </div>
      </validation-provider>
    </form>
    <div class="col">
      <h3>Customer List</h3>
      <table class="table table-light table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone No</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in customer_data" :key="data.id">
            <td class="col">{{ data.customerName }}</td>
            <td class="col">{{ data.phoneNumber }}</td>
            <td class="col">
              <button
                @click="customerEdit(data.public_id)"
                class="btn btn-outline-primary"
              >
                UPDATE
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer_data: [],
      add_customer_data: {
        customerName: "",
        phoneNumber: "",
        address: "",
      },
      error: {
        customerName: false,
        phoneNumber: false,
        address: false,
      },
    };
  },
  beforeMount() {
    this.$http.get(this.$store.getters.url + "/customers").then((data) => {
      this.customer_data = data.body.sort((a,b) => (a.joinDate > b.joinDate) ? 1 : ((b.joinDate > a.joinDate) ? -1 : 0));
    });
  },
  methods: {
    customerEdit(data) {
      this.$router.push("/customer/edit/?public_id=" + data);
    },
    add_customer() {
      this.$http
        .post(
          this.$store.getters.url + "/customer-create",
          this.add_customer_data
        )
        .then((data) => {
          this.$fire({
            title: "Customer Data",
            text: "Added Successfully",
            type: "success",
          }).then(() => {
            this.$router.go();
          });
        })
        .catch((e) => {
          this.$fire({
            title: "Error",
            text: e.data,
            type: "error",
          });
        });
    },
  },
};
</script>

<style>
.required_field_false {
  border-color: red;
}
</style>
