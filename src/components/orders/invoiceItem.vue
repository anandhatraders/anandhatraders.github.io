<template>
  <div id="order-item">
    <h4 class="text-center">Item {{ item_number }}</h4>
    <div class="invoice-details mt25 bg-white container">
      <div class="well">
        <ul class="list-unstyled mb0 row">
          <span class="text-center mb-2">
            <i>
              <span> Stock Present : {{ quantityLeft }} <br /> </span>
              <span v-if="is_owner">
                | Bought price: Rs.{{ sell_price[0] }} |
              </span>
              | Retail Price: Rs.{{ sell_price[1] }} |&nbsp;| Whole Sale price:
              Rs.{{ sell_price[2] }} |
              <br />
              <span v-if="is_owner">
                | Retail Profit: {{ display_profitPer[0] }}% |&nbsp;| Whole Sale
                Profit: {{ display_profitPer[1] }}% |
              </span>
            </i>
          </span>
          <li class="col">
            <strong>Search</strong>
            <select v-model="searchCode" class="form-control mb-3" required>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </select>
            <strong>Item Name</strong>
            <select
              v-model="items_data.stocks"
              class="form-control mb-3"
              required
            >
              <option
                :value="stock.public_id"
                v-for="stock in filterStocks"
                :key="stock.public_id"
                :disabled="!stock.productInstock"
              >
                {{ stock.productName }}
              </option>
            </select>
            <strong>Quantity:</strong
            ><input
              type="number"
              class="form-control mb-3"
              v-model="items_data.quantity"
              step=".01"
              min="0.05"
              required
              :max="quantityLeft"
            />
          </li>
          <li class="col">
            <strong>Item No</strong>
            <select
              v-model="items_data.stocks"
              class="form-control mb-3"
              required
            >
              <option
                :value="stock.public_id"
                v-for="stock in filterStocks"
                :key="stock.public_id"
                :disabled="!stock.productInstock"
              >
                {{ stock.barCodeId }}
              </option>
            </select>
            <strong>Price:</strong>
            <input
              type="number"
              class="form-control mb-3"
              v-model="items_data.price"
              step=".01"
              required
            />
            <!-- :min="sell_price[2]" -->
            <!-- :disabled="!buy_order && !is_owner" -->
            <strong>Total</strong>
            <input
              type="number"
              class="form-control mb-3"
              v-model="items_data.payable"
              step=".01"
              required
            />
          </li>
          <li class="col" v-if="buy_order">
            <strong>Retail Profit</strong>
            <input
              type="number"
              class="form-control mb-3"
              v-model="items_data.profitPer_retail"
              min="1"
              required
            />
            <strong>WholeSale</strong>
            <input
              type="number"
              class="form-control mb-3"
              v-model="items_data.profitPer_wholeSale"
              min="1"
              required
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items_data: {
        stocks: "",
        price: 0,
        quantity: 0,
        payable: 0,
        profitPer_retail: 0,
        profitPer_wholeSale: 0,
      },
      profitPer: [],
      display_profitPer: [],
      searchCode: 100,
    };
  },
  props: {
    stocks: {
      type: Array,
      required: true,
    },
    item_number: {
      type: Number,
      required: true,
    },
    buy_order: {
      type: Boolean,
      default: false,
    },
    search_id: {
      type: Number,
    },
  },
  computed: {
    is_owner() {
      return this.$store.getters.is_owner;
    },
    sell_price() {
      let price = [];
      this.stocks.forEach((element) => {
        if (this.items_data.stocks === element.public_id) {
          price.push(element.sellPrice);
          this.update_profilePrice(element);
          price.push(
            element.sellPrice +
              Math.ceil((element.sellPrice * element.profitPer_retail) / 100)
          );
          price.push(
            element.sellPrice +
              Math.ceil((element.sellPrice * element.profitPer_wholeSale) / 100)
          );
        }
      });
      return price;
    },
    filterStocks() {
      return this.stocks.filter((stock) => {
        if (
          parseInt(this.searchCode) < parseInt(stock.barCodeId) &&
          parseInt(stock.barCodeId) < parseInt(this.searchCode) + 99
        ) {
          return stock;
        }
      });
    },
  },
  methods: {
    update_profilePrice(element) {
      this.display_profitPer.push(
        element.profitPer_retail,
        element.profitPer_wholeSale
      );
    },
    updated_fields() {
      // Currently not called
      // This function is to block the cashier from entering amount in the billings
      if (!this.buy_order && !this.is_owner) {
        this.stocks.forEach((element) => {
          if (this.items_data.stocks === element.public_id) {
            this.items_data.price =
              element.sellPrice +
              Math.ceil((element.sellPrice * element.profitPer) / 100);
          }
        });
      }
      // this.stocks.forEach((element) => {
      //   if (this.items_data.stocks == element.public_id) {
      //     this.local_profitPer = element.profitPer;
      //   }
      // });
    },
  },

  updated() {
    // this.updated_fields();
    this.items_data.item_number = this.item_number;
    let payable = parseFloat(this.items_data.price) * parseFloat(this.items_data.quantity)
    this.items_data.payable = payable.toFixed(2)
    this.$emit("invoice_item", this.items_data);
  },
};
</script>
