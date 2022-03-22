<template>
  <div class="row">
    <div class="col">
      <form method="post" @submit.prevent="updateStock">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="text-center mb-3">Update Stock</h5>
            <div class="input">
              <label>Product Name</label>
              <input
                type="text"
                class="form-control mb-3"
                v-model="update_stock.productName"
                placeholder="Product Name"
                required
              />
              <label>Product Grade</label>
              <input
                type="text"
                class="form-control mb-3"
                v-model="update_stock.product_grade"
                placeholder="Product Grade"
                required
              />
              <label>Note</label>
              <input
                type="text"
                class="form-control mb-3"
                v-model="update_stock.note"
                placeholder="Product Note"
                required
              />
              <label>Retail Profit</label>
              <input
                type="number"
                class="form-control mb-3"
                v-model="update_stock.profitPer_retail"
                placeholder="Product Profit"
                required
              />
              <label>WholeSale Profit</label>
              <input
                type="number"
                class="form-control mb-3"
                v-model="update_stock.profitPer_wholeSale"
                placeholder="Product Profit"
                required
              />
              <input
                type="checkbox"
                class="form-check-input offset-3"
                v-model="update_stock.productInstock"
                required
              />
              <label class="mb-1">Add to Billings Page</label>
              <div class="input-group-postpend">
                <button type="submit" class="btn btn-success w-100">
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      update_stock: {
        productName: "",
        product_grade: "",
        note: "",
        quantitiesLeft: 0,
        productInstock: false,
        profitPer_retail: 0,
        profitPer_wholeSale: 0,
      },
    };
  },
  methods: {
    updateStock() {
      this.$http
        .post(
          this.$store.getters.url +
            "/stock-update/" +
            this.$route.query.public_id,
          this.update_stock
        )
        .then((data) => {
          this.$fire({
            title: "Stocks Detail",
            text: "Updated Successfully",
            type: "success",
          }).then((r) => {
            this.$router.go("/");
          });
        })
        .catch((e) => {
          this.$fire({
            title: "Error",
            text: "Please Try Again will all data Added",
            type: "error",
          });
          console.log(e);
        });
    },
  },
  beforeMount() {
    this.$http
      .get(
        this.$store.getters.url + "/stock-update/" + this.$route.query.public_id
      )
      .then((data) => {
        this.update_stock = data.body;
      });
  },
};
</script>