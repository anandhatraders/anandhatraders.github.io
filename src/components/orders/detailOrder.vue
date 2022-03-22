<template>
  <div class="bg-white pt-3" ref="inputName">
    <div class="row invoice row-printable">
      <div class="col-md-10">
        <div class="panel panel-default plain" id="dash_0">
          <div class="panel-body p30">
            <div class="row">
              <div class="col">
                <div class="invoice-logo">
                  <img
                    width="150px"
                    src="src/assets/logo.png"
                    alt="logo"
                    style="margin-left: 5px"
                  />
                </div>
              </div>
              <div class="col">
                <div class="invoice-from">
                  <ul class="list-unstyled text-right">
                    <li><b> ANANDHA TRADERS </b></li>
                    <!-- <li>CHENNAI</li> -->
                    <li>9600043909</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-12 mt-3">
                <hr />
                <div class="invoice-details mt25">
                  <div class="well">
                    <ul class="list-unstyled mb0 row">
                      <li class="col">
                        <strong>Cust: </strong>
                        {{ order_data[0].customers }}
                        <br />
                        <strong>labour:</strong>{{ order_data[0].labour }}
                      </li>
                      <li class="col">
                        <strong>Date:</strong>
                        {{ order_data[0].purchaseDate | formatDate }}
                        <br />
                        <strong>Mode:</strong>
                        {{ order_data[0].payment_type.toUpperCase() }}
                      </li>
                    </ul>
                  </div>
                </div>
                <hr />
                <div class="invoice-items">
                  <div class="text-center mb-2">
                    <i><b>INVOICE</b></i>
                  </div>
                  <div
                    class="table-responsive"
                    style="overflow: hidden; outline: none"
                    tabindex="0"
                  >
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th class="per70 text-center">Item</th>
                          <th class="per5 text-center">Qty</th>
                          <th class="per5 text-center">price</th>
                          <th class="per25 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in order_data" :key="data.public_id">
                          <td>
                            {{ data.stocks.substring(10).split(",")[0] }}
                          </td>
                          <td class="text-center">{{ data.quantity }}</td>
                          <td class="text-center">{{ data.price }}</td>
                          <td class="text-center">
                            ₹&nbsp;{{ data.price * data.quantity }}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colspan="3" class="text-right">Grand Total</th>
                          <th class="text-center">₹&nbsp;{{ totalAmount }}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div class="invoice-footer mt25">
                  <p class="text-center text-muted">
                    <small>{{ invoice }}</small>
                    <button
                      class="btn btn-info w-100 mt-3"
                      @click="printWindow"
                    >
                      <b style="color: white"> PRINT </b>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order_data: [],
      totalAmount: 0,
      invoice: "",
    };
  },
  methods: {
    mount_order_data(data) {
      this.order_data = data;
      for (let d in this.order_data) {
        this.totalAmount += this.order_data[d]["payable"];
        this.invoice = this.order_data[d]["invoice"];
      }
    },
    printWindow() {
      var restorepage = document.body.innerHTML;
      var printcontent = this.$refs.inputName.innerHTML;
      document.body.innerHTML = printcontent;
      window.print();
      document.body.innerHTML = restorepage;
    },
  },
  beforeMount() {
    this.$http
      .get(
        this.$store.getters.url + "/invoice-item/" + this.$route.query.public_id
      )
      .then((data) => {
        this.mount_order_data(data.body);
      });
  },
};
</script>
