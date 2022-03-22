<template>
  <div class="container">
    <form method="post" @submit.prevent="update_customer">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="text-center mb-3">Update Customer</h5>
          <div class="input">
            <label>Customer Name</label>
            <input
              type="text"
              class="form-control mb-3"
              v-model="customer_data.customerName"
              placeholder="Customer Name"
              required
            />
            <label>Phone Number</label>
            <input
              type="text"
              class="form-control mb-3"
              v-model="customer_data.phoneNumber"
              placeholder="Phone Number"
              required
            />
            <label>Address</label>
            <input
              type="text"
              class="form-control mb-3"
              v-model="customer_data.address"
              placeholder="Address"
              required
            />
            <div class="input-group-postpend">
              <button type="submit" class="btn btn-success w-100">
                Update Customer
              </button>
            </div>
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
      customer_data: {
        public_id: "",
        customerName: "",
        phoneNumber: null,
        address: "",
      },
    };
  },
  methods: {
    update_customer() {
      this.$http
        .post(
          this.$store.getters.url +
            "/customer-update/" +
            this.$route.query.public_id,
          this.customer_data
        )
        .then(() => {
          this.$fire({
            title: "Customer Data",
            text: "Updated  Successfully",
            type: "success",
          });
        })
        .catch((e) => {
          console.error(e);
          this.$fire({
            title: "Error",
            text: "Please Try Again will all data Added",
            type: "error",
          });
        });
    },
  },
  beforeMount() {
    this.$http
      .get(
        this.$store.getters.url +
          "/customer-update/" +
          this.$route.query.public_id
      )
      .then((data) => {
        this.customer_data = data.body;
      });
  },
};
</script>

<style scoped>
.container {
  margin: 80px auto;
}
</style>