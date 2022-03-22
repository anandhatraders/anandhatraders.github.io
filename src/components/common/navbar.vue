<template>
  <body class="nav">
    <div class="container">
      <nav>
        <span
          class="icon m-1 px-3"
          style="background-color: #169ccf; border-radius: 5px"
          >&equiv;</span
        >

        <ul>
          <li class="text-center">
            <button class="btn btn-success w-100" type="button">
              <router-link to="/place-order" class="anchor"
                >Place Order</router-link
              >
            </button>
          </li>
          <li class="text-center">
            <router-link to="/" class="anchor w-100">Stocks</router-link>
          </li>
          <li class="text-center">
            <router-link to="/customers" class="anchor w-100"
              >Customers</router-link
            >
          </li>

          <li class="text-center">
            <router-link to="/orders" class="anchor w-100"
              >View Invoice</router-link
            >
          </li>

          <!-- <li class="text-center">
            <router-link to="/user/add" class="anchor w-100"
              >Create User</router-link
            >
          </li>

          <li class="text-center">
            <router-link to="/profile" class="anchor w-100"
              >Profile</router-link
            >
          </li>

          <li v-if="admin_user" class="text-center">
            <router-link to="/admin/users/all" class="anchor w-100">
              User Details
            </router-link>
          </li> -->

          <li v-if="!current_user">
            <button class="btn btn-outline-info w-100" type="button">
              <router-link to="/signin" class="anchor"> SignIn </router-link>
            </button>
          </li>
          <li v-if="current_user">
            <button class="btn btn-primary w-100" type="button">
              <router-link to="/signout" class="anchor">Logout</router-link>
            </button>
          </li>
        </ul>
      </nav>
      <a @click="go_back" class="float">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-skip-backward-fill fa fa-plus my-float"
          viewBox="0 0 16 16"
        >
          <path
            d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"
          />
        </svg>
      </a>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      current_user: this.$store.getters.auth.loggedIn,
      admin_user: this.$store.getters.auth.isAdmin,
    };
  },
  methods: {
    go_back() {
      history.back();
    },
  },
};
</script>

<style scoped>
body {
  background-color: #78909c;
  width: 500%;
  height: 400%;
  margin: 0;
  padding: 0;
}
nav {
  position: fixed;
  left: -16em;
  top: 0;
  bottom: 0;
  background-color: #4f514e;
  border-right: 50px solid #169ccf;
  box-shadow: 4px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 8;
  cursor: pointer;
}

.icon {
  left: 6.7em;
  display: block;
  font-size: 30pt;
  color: #fff;
  position: absolute;
  text-decoration: none;
  font-family: "Carrois Gothic", sans-serif;
}

nav ul {
  width: 14em;
  list-style-type: none;
  margin: 0;
  padding: 1em;
}

nav ul li {
  width: 100%;
  text-align: left;
  padding: 4px 4px;
  margin-top: 5px;
  color: #fff;
  background: transparent;
  font-size: 20px;
  float: left;
  text-shadow: rgb(71, 73, 70) 1px 1px, rgb(71, 73, 70) 2px 2px,
    rgb(71, 73, 70) 3px 3px, rgb(71, 73, 70) 4px 4px, rgb(71, 73, 70) 5px 5px,
    rgb(71, 73, 70) 6px 6px, rgb(71, 73, 70) 7px 7px, rgb(71, 73, 70) 8px 8px,
    rgb(71, 73, 70) 9px 9px, rgb(71, 73, 70) 10px 10px,
    rgb(71, 73, 70) 11px 11px, rgb(71, 73, 70) 12px 12px,
    rgb(71, 73, 70) 13px 13px, rgb(71, 73, 70) 14px 14px,
    rgb(72, 74, 71) 15px 15px, rgb(72, 74, 71) 16px 16px;
}

nav .anchor:link,
nav .anchor:visited {
  display: block;
  width: 100%;
  font-weight: bold;
  line-height: 2.5em;
  text-indent: 10px;
  text-decoration: none;
  color: #fff;
  border-radius: 4px;
  outline: 0 none;
}

nav .anchor:hover,
nav .anchor:focus {
  color: #fff;
  background-color: #4f514e;
  text-shadow: 0 0 4px #fff;
  /*box-shadow: inset 0 2px 2px #808080;*/
}

nav,
nav * {
  -webkit-transition: all 500ms ease;
  transition: all 500ms ease;
}

nav:hover {
  left: 0;
}

nav:hover ~ article:after {
  left: 60%;
}

.float {
  position: fixed;
  width: 50px;
  height: 50px;
  top: 10px;
  right: 10px;
  background-color: whitesmoke;
  color: black;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
}

.my-float {
  margin-top: 18px;
}

@media only screen and(min-device-width:320px) and (max-device-width: 480px) and(-webkit-min-device-pixel-ratio:2) {
  body {
    background-color: #78909c;
    margin: 0;
    padding: 0;
  }
  nav {
    position: fixed;
    left: -16em;
    top: 0;
    bottom: 0;
    background-color: #4f514e;
    border-right: 50px solid #169ccf;
    box-shadow: 4px 0 5px rgba(0, 0, 0, 0.2);
    z-index: 40;
  }
  nav ul li {
    text-align: left;
    padding: 4px 4px;
    margin-top: 5px;
    color: #fff;
    background: transparent;
    font-size: 40px;
    float: left;
    text-shadow: rgb(71, 73, 70) 1px 1px, rgb(71, 73, 70) 2px 2px,
      rgb(71, 73, 70) 3px 3px, rgb(71, 73, 70) 4px 4px, rgb(71, 73, 70) 5px 5px,
      rgb(71, 73, 70) 6px 6px, rgb(71, 73, 70) 7px 7px, rgb(71, 73, 70) 8px 8px,
      rgb(71, 73, 70) 9px 9px, rgb(71, 73, 70) 10px 10px,
      rgb(71, 73, 70) 11px 11px, rgb(71, 73, 70) 12px 12px,
      rgb(71, 73, 70) 13px 13px, rgb(71, 73, 70) 14px 14px,
      rgb(72, 74, 71) 15px 15px, rgb(72, 74, 71) 16px 16px;
  }
}
</style>
