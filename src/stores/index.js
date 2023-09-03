import { defineStore } from "pinia";
import getProductList from "../services/index.js";
import axios from "axios";
export const useStore = defineStore("store", {
  state: () => ({
    isAuth: 0,
    userLogin: "",
    productList: [],
    filteredProductList: [],
    productsInCart: [],
    checkAuth: false,
    total: 0,
    isSuccessfullyAdded: false,
  }),
  actions: {
    async getProductList() {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        this.productList = res.data;
        this.filteredProductList = res.data;
      } catch (error) {
        console.log(error);
        this.productList = [];
        this.filteredProductList = [];
      }
    },
    calcTotal() {
      let total = 0;
      this.productsInCart.forEach(function (product) {
        total += product.price * product.quantity;
      });
      this.total = +total.toFixed(2);
      console.log('calcTotal this.total', this.total);
      return +total.toFixed(2);
    },
    login(userLogin) {
      this.isAuth = 1;
      this.userLogin = userLogin;
      this.checkAuth = true;
    },
    logout() {
      this.isAuth = 0;
      this.userLogin = "";
      this.checkAuth = false;
    },
    addProductInCart(product) {
      if (this.productsInCart.length === 0) {
        product.quantity = 1;
        this.productsInCart.push(product);
      } else {
        let index = this.productsInCart.findIndex(
          (item) => +item.id === +product.id
        );

        if (index !== -1 && this.productsInCart[index].quantity) {
          this.productsInCart[index].quantity += 1;
        } else {
          product.quantity = 1;
          this.productsInCart.push(product);
        }
      }
    },
    removeProductInCart(product) {
      let index = this.productsInCart.findIndex(
        (item) => +item.id === +product.id
      );
      this.productsInCart.splice(index, 1);
    },
    minusProductItem(product) {
      let index = this.productsInCart.findIndex(
        (item) => +item.id === +product.id
      );
      this.productsInCart[index].quantity -= 1;
      if (this.productsInCart[index].quantity === 0) {
        this.removeProductInCart(product);
      }
    },
    plusProductItem(product) {
      console.log('store plusProductItem');
      let index = this.productsInCart.findIndex(
        (item) => +item.id === +product.id
      );
      this.productsInCart[index].quantity += 1;
    },
    searchProduct(filterPrice, filterProduct) {
      if (filterPrice && filterProduct) {
        this.filteredProductList = this.filteredProductList.filter(
          (product) =>
            product.title.toLowerCase().includes(filterProduct) &&
            +product.price === +filterPrice
        );
        return;
      }
      if (filterPrice) {
        this.filteredProductList = this.filteredProductList.filter(
          (product) => +product.price === +filterPrice
        );
        return;
      }
      if (filterProduct) {
        this.filteredProductList = this.filteredProductList.filter((product) =>
          product.title.toLowerCase().includes(filterProduct)
        );
        return;
      }
      this.filteredProductList = this.productList;
    },
    async addNewProduct(product) {
      axios
        .post("https://fakestoreapi.com/products", product, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          if (+response.status === 200) {
            return true;
          }
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
    },
    async sendUserData(userDate) {
      axios
        .post("https://httpbin.org/post", userDate, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          if (+response.status === 200) {
            return true;
          }
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
    },
    async getCurrentProduct(id) {
      const res = await axios.get(
        "https://fakestoreapi.com/products/" + id
      );
      return res.data;
    },
  },
});
