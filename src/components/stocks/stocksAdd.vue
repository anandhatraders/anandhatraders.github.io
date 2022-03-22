<template>
  <div class="container">
    <form method="post" @submit.prevent="create_stock">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="text-center mb-3">Add Stock</h5>
          <div class="input">
            <input
              type="text"
              class="form-control mb-3"
              v-model="add_stock.productName"
              placeholder="Product Name"
              required
            />

            <input
              type="text"
              class="form-control mb-3"
              v-model="add_stock.product_grade"
              placeholder="Product Grade"
              required
            />

            <input
              type="text"
              class="form-control mb-3"
              v-model="add_stock.barCodeId"
              placeholder="BarCode ID"
              required
            />

            <input
              type="text"
              class="form-control mb-3"
              v-model="add_stock.note"
              placeholder="Product Note"
              required
            />
            <div class="input-group-postpend">
              <button type="submit" class="btn btn-success w-100">
                Add Stock
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
      add_stock: {
        productName: "",
        product_grade: "",
        note: "",
        barCodeId: null,
      },
    };
  },
  methods: {
    create_stock() {
      this.$confirm("Are you sure?").then(() => {
        this.$http
          .post(this.$store.getters.url + "/stock-create", this.add_stock)
          .then(() => {
            this.$fire({
              title: "Stocks Detail",
              text: "Added Successfully",
              type: "success",
            }).then(() => {
              this.$router.go("/");
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
      });
    },
  },
};
</script>

<style scoped>
.container {
  margin: 80px auto;
}
</style>
