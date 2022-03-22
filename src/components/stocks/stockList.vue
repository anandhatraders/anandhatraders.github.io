<template>
  <div class="custom-container">
    <div
      v-if="$store.getters.is_owner"
      class="btn btn-primary"
      style="display: flex; justify-content: center"
    >
      <router-link to="/stock-create" class="anchor">
        <h3 class="text-white">Add Stocks</h3>
      </router-link>
    </div>
    <div
      v-for="data in stock_data"
      :key="data.public_id"
      class="card mt-3 mb-3"
      style="width: 100%; text-align: center"
    >
      <div class="card-header">
        <b>{{ data.barCodeId }}</b
        >&nbsp;
        {{ data.productName }}
        &nbsp;
        <button
          class="btn btn-sm btn-outline-info"
          v-if="$store.getters.is_owner"
          @click="stockUpdate(data.public_id)"
        >
          UPDATE
        </button>
      </div>
      <span v-if="data.quantitiesLeft < 2" class="btn btn-danger disabled m-2"
        >Running Out Soon
      </span>
      <!-- <span class="row mt-1">
        <span class="col">Product Grade</span>
        <span class="col">{{ data.product_grade }}</span>
      </span> -->
      <span class="row mt-1">
        <span class="col">Quantities Left</span>
        <span class="col">{{ data.quantitiesLeft }}</span>
      </span>
      <!-- <span class="row mt-1">
        <span class="col">Product Note</span>
        <span class="col">{{ data.note }}</span>
      </span> -->
      <span class="row mt-1">
        <span class="col">Retail Price</span>
        <span class="col"
          >Rs.{{
            Math.ceil(
              (data.sellPrice * data.profitPer_retail) / 100 + data.sellPrice
            )
          }}</span
        >
      </span>
      <span class="row mt-1">
        <span class="col">WholeSale Price</span>
        <span class="col"
          >Rs.{{
            Math.ceil(
              (data.sellPrice * data.profitPer_wholeSale) / 100 + data.sellPrice
            )
          }}</span
        >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stock_data: [],
    };
  },
  methods: {
    stockUpdate(data) {
      this.$router.push("/stock-update?public_id=" + data);
    },
  },
  beforeMount() {
    this.$http.get(this.$store.getters.url + "/stocks").then((data) => {
      this.stock_data = data.body.sort((a, b) =>
        a.barCodeId > b.barCodeId ? 1 : b.barCodeId > a.barCodeId ? -1 : 0
      );
    });
  },
};
</script>

<style scoped>
.custom-container {
  margin: 80px auto;
}
</style>
