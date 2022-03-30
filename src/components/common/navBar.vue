<template>
  <div class="main container" v-if="this.$device.mobile">
    <header class="header" id="header">
      <nav class="navbar container">
        <a href="/" class="brand"
          >Anandha Traders
          <span
            style="color: red"
            v-if="$store.getters.url == 'https://api-dev-at.herokuapp.com'"
            >DEVELOP</span
          ></a
        >
        <div class="menu" id="menu">
          <ul class="menu-list">
            <li class="menu-item">
              <router-link to="/" class="menu-link">
                <!-- <i class="bi bi-house-fill"></i> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35px"
                  height="28px"
                  fill="currentColor"
                  class="bi bi-house-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  />
                </svg>
                <!-- <span class="menu-name">Stocks</span> -->
              </router-link>
            </li>

            <li class="menu-item">
              <router-link to="/orders" class="menu-link">
                <!-- <i class="bi bi-cart3"></i> -->
                <!-- <span class="menu-name">Invoices</span> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35px"
                  height="28px"
                  fill="currentColor"
                  class="bi bi-folder-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"
                  />
                </svg>
              </router-link>
            </li>

            <li class="menu-item">
              <router-link to="/place-order" class="menu-link">
                <!-- <i class="bi bi-receipt-cutoff"></i> -->
                <!-- <span class="menu-name">Place_Order</span> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35px"
                  height="28px"
                  fill="currentColor"
                  class="bi bi-cart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                  />
                </svg>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="/customers" class="menu-link">
                <!-- <i class="bi bi-people-fill"></i> -->
                <!-- <span class="menu-name">Customers</span> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35px"
                  height="28px"
                  fill="currentColor"
                  class="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                  />
                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
              </router-link>
            </li>

            <!-- <li v-if="admin_user" class="text-center">
              <router-link to="/admin/users/all" class="anchor w-100">
                User Details
              </router-link>
            </li> -->

            <li v-if="!current_user">
              <button class="btn btn-outline-info w-100" type="button">
                <router-link to="/signin" class="anchor"> SignIn </router-link>
              </button>
            </li>
            <li v-if="current_user" class="menu-item">
              <button class="btn btn-primary w-100" type="button">
                <router-link to="/signout" class="menu-link">
                  <i class="menu-icon ion-md-contact"></i>
                  <!-- <span class="menu-name">Logout</span> -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35px"
                    height="28px"
                    fill="currentColor"
                    class="bi bi-power"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.5 1v7h1V1h-1z" />
                    <path
                      d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"
                    />
                  </svg>
                </router-link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <!-- <a @click="go_back" class="float">
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
      </a> -->
    </header>
  </div>
  <div v-else>
    <nav class="navbar navbar-expand-sm navbar-light" style="background-color: #e3f2fd;">
      <div class="container">
        <a class="navbar-brand" href="/"><b>Anandha Traders</b></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item mx-3">
              <router-link to="/" class="menu-link">Stocks</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link to="/orders" class="menu-link">Invoices</router-link>
            </li>
             <li class="nav-item mx-3">
              <router-link to="/place-order" class="menu-link">Place Order</router-link>
            </li>
             <li class="nav-item mx-3">
              <router-link to="/customers" class="menu-link">Customers</router-link>
            </li>
              <!-- <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li> -->
          </ul>
          <form class="d-flex">
            <!-- <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button> -->
              <router-link to="/signout" class="menu-link"><button class="btn btn-warning">Sign Out</button></router-link>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_user: this.$store.getters.auth.loggedIn,
      admin_user: this.$store.getters.auth.isAdmin,
    };
  },
  // methods: {
  //   go_back() {
  //     history.back();
  //   },
  // },
};
const menuLinks = document.querySelectorAll(".menu-link");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuLinks.forEach((link) => {
      link.classList.remove("is-active");
    });
    link.classList.add("is-active");
  });
});
</script>

<style >
:root {
  --color-black: hsl(0, 0%, 10%);
  --color-white: hsl(0, 0%, 100%);
  --color-darken: hsl(0, 0%, 20%);
  --color-teal-100: hsl(160, 85%, 87%);
  --color-teal-200: hsl(162, 78%, 77%);
  --color-teal-300: hsl(162, 72%, 65%);
  --color-teal-400: hsl(162, 68%, 54%);
  --color-teal-500: hsl(162, 73%, 46%);
  --color-teal-600: hsl(162, 82%, 40%);
  --color-teal-700: hsl(162, 87%, 35%);
  --color-teal-800: hsl(162, 88%, 30%);
  --color-teal-900: hsl(162, 88%, 26%);
  --shadow-small: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-medium: 0 -4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  list-style-type: none;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

html {
  font-size: 100%;
  box-sizing: inherit;
  scroll-behavior: smooth;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
  background: var(--color-white);
}

a,
button {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  text-decoration: none;
}

img,
video {
  display: block;
  max-width: 100%;
  height: auto;
  -o-object-fit: cover;
  object-fit: cover;
}

.container {
  max-width: 75rem;
  height: auto;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.brand {
  font-family: inherit;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.1;
  position: relative;
  color: var(--color-teal-800);
  text-transform: uppercase;
  background: var(--color-white);
  display: grid;
  width: 200%;
  height: 3.8rem;
  box-shadow: var(--shadow-medium);
  align-items: center;
  text-align: center;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 100;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  margin: 0 auto;
}

.menu {
  position: fixed;
  left: 0;
  bottom: 0;
  display: grid;
  align-content: center;
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  background: var(--color-white);
  box-shadow: var(--shadow-medium);
}
.menu-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.menu-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: none;
  outline: none;
  color: var(--color-black);
}
.menu-link.router-link-exact-active {
  position: relative;
  color: var(--color-teal-800);
  transition: all 0.35s ease;
}
.menu-icon {
  font-size: 1.35rem;
  line-height: 1;
  color: inherit;
}
.menu-name {
  display: none;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  visibility: hidden;
  text-transform: capitalize;
}

@media only screen and (min-width: 360px) {
  .menu-name {
    display: block;
    visibility: visible;
  }
}
@media only screen and (min-width: 576px) {
  .menu-list {
    justify-content: center;
    -moz-column-gap: 3rem;
    column-gap: 3rem;
  }
}
@media only screen and (min-width: 768px) {
  .header {
    background: var(--color-white);
    box-shadow: var(--shadow-medium);
    transition: all 0.35s ease-in-out;
  }

  .menu {
    position: relative;
    top: 0;
    right: 0;
    width: auto;
    height: auto;
    background: none;
    box-shadow: none;
  }
  .menu-link.router-link-exact-active::before {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    width: 2rem;
    height: 2px;
    border: none;
    outline: none;
    background: var(--color-teal-800);
  }
  .menu-link:hover {
    color: var(--color-teal-800);
    transition: all 0.35s ease;
  }
  .menu-icon {
    display: none;
    visibility: hidden;
  }
  .menu-name {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    margin-bottom: 0.2rem;
  }
}
</style>
