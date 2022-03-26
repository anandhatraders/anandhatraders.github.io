<template>
  <div class="customer-container">
    <!-- <div class="alert alert-light">
        <h3 class="text-center">Stock Details</h3>
        <span
          v-for="stock in stocks"
          :key="stock.public_id"
          class="row"
          style="border-top: 0.1px solid grey"
          ><b class="col">{{ stock.productName }}</b
          >- <span class="col"> {{ stock.quantitiesLeft }} </span></span
        >
      </div> -->
    <form method="post" @submit.prevent="placeOrder">
      <div class="invoice-details mt25 bg-white container">
        <div class="well">
          <ul class="list-unstyled mb0 row menu-list">
            <h3 class="text-center my-2">Billing Details</h3>
            <hr />
            <li class="col">
              <strong>Customer Name: </strong>
              <select
                v-model="static_data.customers"
                class="form-control mb-3"
                required
              >
                <option
                  :value="customer.public_id"
                  v-for="customer in customers"
                  :key="customer.public_id"
                >
                  {{ customer.customerName }}
                </option>
              </select>
              <br />
              <strong>Customer Ph:</strong>
              <select
                v-model="static_data.customers"
                class="form-control mb-3"
                required
              >
                <option
                  :value="customer.public_id"
                  v-for="customer in customers"
                  :key="customer.public_id"
                >
                  {{ customer.phoneNumber }}
                </option>
              </select>
              <!-- <br />
                <strong>labour:</strong
                ><select v-model="static_data.labour" class="form-control mb-3">
                  <option
                    :value="labour.public_id"
                    v-for="labour in labours"
                    :key="labour.public_id"
                  >
                    {{ labour.username }}
                  </option>
                </select> -->
            </li>
            <li class="col">
              <strong>Purchase Type:</strong>
              <select
                v-model="static_data.purchaseType"
                class="form-control mb-3"
                required
              >
                <option value="sell">Sell</option>
                <option value="buy">Buy</option>
                <option value="waste">Wasted</option>
              </select>

              <br />
              <strong>Payment mode:</strong>
              <select
                v-model="static_data.payment_type"
                class="form-control mb-3"
                required
              >
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
              </select>
            </li>
          </ul>
          <strong>Reference:</strong>
          <input
            v-model="static_data.payment_reference_id"
            class="form-control mb-3"
            required
          />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div v-for="item_no in total_item" :key="item_no.id">
            <invoiceItemVue
              @invoice_item="set_value"
              :stocks="stocks"
              :item_number="item_no"
              :buy_order="buy_order"
            ></invoiceItemVue>
          </div>
          <div class="offset-3">
            <button @click.prevent="add_number" class="btn btn-secondary">
              Add
            </button>
            <button @click.prevent="remove" class="btn btn-secondary">
              Remove
            </button>
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100 check">
          Place Order
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import invoiceItemVue from "./invoiceItem.vue";
export default {
  data() {
    return {
      invoice_id: "",
      customers: [],
      labours: [],
      stocks: [],
      data_entry: [],
      order_data: {},
      static_data: {
        customers: "ed79b6c9-94e0-468c-8ce8-69afe2dc3553",
        purchaseType: "sell",
        placedBy: "",
        labour: "",
        invoice: "",
        payment_reference_id: "Cash",
        payment_type: "cash",
      },
      item: [],
      total_item: 1,
      total_amount_to_paid: 0,
    };
  },
  computed: {
    buy_order() {
      return this.static_data.purchaseType === "buy";
    },
  },
  methods: {
    add_number() {
      ++this.total_item;
    },
    set_value(value) {
      this.item[value.item_number] = value;
    },
    remove() {
      if (this.total_item > 1) {
        --this.total_item;
      }
    },
    placeOrder() {
      this.$confirm("Are you sure? Want to Place Order").then(() => {
        this.static_data.invoice = this.invoice_id;
        this.static_data.placedBy = this.$store.getters.public_id;
        this.data_entry = [];
        this.total_amount_to_paid = 0;
        this.item.forEach((item) => {
          this.data_entry.push({ ...this.static_data, ...item });
          this.total_amount_to_paid += parseFloat(item.payable);
        });
        this.order_data["invoice_id"] = this.invoice_id;
        this.order_data["data_entry"] = this.data_entry;
        this.order_data["totalCost"] = this.total_amount_to_paid;
        this.post_order_data(this.order_data);
      });
    },
    post_order_data(data) {
      this.$http
        .post(this.$store.getters.url + "/order-create", data)
        .then(() => {
          this.$fire({
            title: "Order Placed for Rs." + this.total_amount_to_paid,
            text: "Please Wait Inovice loading",
            type: "success",
            timer: 3000,
          }).then(() => {
            this.$router.push("/invoice/item?public_id=" + this.invoice_id);
          });
        })
        .catch((e) => {
          this.$fire({
            title: "Error",
            text: "Please Try Again will all data Added",
            type: "error",
          });
          console.error(e.data);
        });
    },
  },
  beforeMount() {
    this.$http
      .get(this.$store.getters.url + "/order-create", this.add_order_data)
      .then((data) => {
        this.invoice_id = data.body.invoice_id;
        this.customers = data.body.customers.sort((a, b) =>
          a.joinDate > b.joinDate ? 1 : b.joinDate > a.joinDate ? -1 : 0
        );
        this.labours = data.body.labours;
        this.stocks = data.body.stocks.sort((a, b) =>
          a.barCodeId > b.barCodeId ? 1 : b.barCodeId > a.barCodeId ? -1 : 0
        );
      });
  },
  components: {
    invoiceItemVue,
  },
};
</script>

<style scoped>
.customer-container {
  margin: 80px auto;
  padding: 0px;
}
</style>