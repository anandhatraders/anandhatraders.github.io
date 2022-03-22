<template>
  <div class="row">
    <div class="col">
      <form method="post" @submit.prevent="create_stock">
        <validation-provider rules="required" v-slot="{ errors }">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="text-center mb-3">Add Stock</h5>
              <div class="input">
                <input
                  type="text"
                  class="form-control mb-3"
                  v-model="add_stock.productName"
                  placeholder="Product Name"
                  :class="{ required_field_false: error.productName }"
                  required
                />

                <input
                  type="text"
                  class="form-control mb-3"
                  v-model="add_stock.product_grade"
                  placeholder="Product Grade"
                  :class="{ required_field_false: error.product_grade }"
                  required
                />

                <label>BarCode ID</label>
                <input
                  type="number"
                  class="form-control mb-3"
                  v-model="add_stock.barCodeId"
                  placeholder="BarCode ID"
                  :class="{ required_field_false: error.barCodeId }"
                  required
                />

                <input
                  type="text"
                  class="form-control mb-3"
                  v-model="add_stock.note"
                  placeholder="Product Note"
                  :class="{ required_field_false: error.note }"
                  required
                />
                <div class="input-group-postpend">
                  <button type="submit" class="btn btn-success w-100">
                    Add Stock
                  </button>
                </div>
              </div>
              <span class="required_field_false">{{ errors[0] }}</span>
            </div>
          </div>
        </validation-provider>
      </form>
    </div>
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
        barCodeId: 0,
      },
      error: {
        productName: false,
        product_grade: false,
        note: false, 
      },
    };
  },
  methods: {
    create_stock() {
      this.$confirm("Are you sure?").then(() => {
        this.$http
          .post(this.$store.getters.url + "/stock-create", this.add_stock)
          .then((data) => {
            this.$fire({
              title: "Stocks Detail",
              text: "Added Successfully",
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
          });
      });
    },
  },
};
</script>