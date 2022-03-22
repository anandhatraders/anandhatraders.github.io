<template>
  <div class="row">
    <div class="mb-3">
      <button @click="orders_placed_last(0)" class="btn btn-outline-dark">
        Today
      </button>
      <button @click="orders_placed_last(7)" class="btn btn-outline-dark">
        last 7 days
      </button>
      <button @click="orders_placed_last(30)" class="btn btn-outline-dark">
        last 30 days
      </button>
    </div>
    <div class="mb-3">
      <button @click="invoice_type('buy')" class="btn btn-primary">
        Buy Invoice
      </button>
      <button @click="invoice_type('sell')" class="btn btn-success">
        Sell Invoice
      </button>
      <button @click="invoice_type('waste')" class="btn btn-danger">
        Wasted
      </button>
    </div>

    <form method="POST" @submit.prevent="order_by">
      <div class="card mb-3">
        <div class="card-body">
          <h5>FROM & TO DATE</h5>
          <div class="input-group">
            <input
              type="date"
              class="form-control"
              v-model="order_sort.from_date"
              required
            />
            <input
              type="date"
              class="form-control"
              v-model="order_sort.to_date"
              required
            />
            <div class="input-group-postpend">
              <button type="submit" class="btn btn-secondary w-100">
                Show Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div style="margin-left: 1%">
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Customer</th>
            <th scope="col">B/S</th>
            <th scope="col">Billed</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="invoiceItem_data in invoice_data"
            :key="invoiceItem_data.public_id"
            @click="detailInvoice(invoiceItem_data[0].invoice)"
          >
            <td class="col">
              {{ invoiceItem_data[0].purchaseDate | formatDate }}
            </td>
            <td class="col">{{ invoiceItem_data[0].customers }}</td>
            <td class="col">{{ invoiceItem_data[0].purchaseType }}</td>
            <td class="col">Rs&nbsp;{{ invoiceItem_data.cost }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      order_sort: {
        from_date: "",
        to_date: "",
        count: null,
      },
      invoice_data: [],
      hashed_invoice_data: [],
    };
  },
  methods: {
    mount_invoice(data) {
      this.invoice_data = [];
      for (let j in data) {
        if (data[j].length) {
          this.invoice_data.push(data[j]);
          this.hashed_invoice_data.push(data[j]);
        }
      }
      for (let i in this.invoice_data) {
        let cost = 0;
        for (let d in this.invoice_data[i]) {
          cost += this.invoice_data[i][d]["payable"];
        }
        this.invoice_data[i]["cost"] = cost;
      }
      this.invoice_data.reverse();
    },
    orders_placed_last(days) {
      let dateTo = moment().format("YYYY-MM-DD");
      let dateFrom = moment().subtract(days, "d").format("YYYY-MM-DD");
      console.log(dateTo, dateFrom);
      this.$http
        .get(
          this.$store.getters.url +
            "/invoice-items?from_date=" +
            dateFrom +
            "&to_date=" +
            dateTo
        )
        .then((data) => {
          this.mount_invoice(data.body);
        });
    },
    order_by() {
      this.$http
        .get(
          this.$store.getters.url +
            "/invoice-items?from_date=" +
            this.order_sort.from_date +
            "&to_date=" +
            this.order_sort.to_date
        )
        .then((data) => {
          this.mount_invoice(data.body);
        });
    },
    detailInvoice(data) {
      this.$router.push("/invoice/item?public_id=" + data);
    },
    invoice_type(type) {
      let type_invoice_data = this.hashed_invoice_data;
      this.invoice_data = [];
      for (let data in type_invoice_data) {
        if (type_invoice_data[data][0].purchaseType == type) {
          this.invoice_data.push(type_invoice_data[data]);
        }
      }
    },
    invoice_customer(name) {
      let type_invoice_data = this.hashed_invoice_data;
      this.invoice_data = [];
      for (let data in type_invoice_data) {
        if (type_invoice_data[data][0].customers == name) {
          this.invoice_data.push(type_invoice_data[data]);
        }
      }
    },
  },
  beforeMount() {
    this.$http.get(this.$store.getters.url + "/invoice-items").then((data) => {
      this.mount_invoice(data.body);
    });
  },
};
</script>
