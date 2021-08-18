import React, { Component, Suspense } from 'react';
import 'firebase/auth'
import 'firebase/database'
import seedDb from '../../utils/products.json';
import Nav from './nav/nav';
import Loading from './loading/loading';
import { FirebaseContext } from '../../context/firebase';
import Sort from './sort/sort';
import Filter from './filter/filter';

const FeaturedProduct = React.lazy(() => import('./featured/featured'));
const ProductList = React.lazy(() => import('./productlist/productlist'));

class Home extends Component {
  static contextType = FirebaseContext;
  firebase = this.context;

  state = {
    ready: false,
    products: [],
    productList: [],
    cart: [],
    showCart: false,
    featuredProduct: null,
    productCategories: [],
    productPriceRanges: [],
    filterByCategories: [],
    filterByPriceRange: { min: null, max: null },
    showFilterModal: false,
    sortingType: 'alphabetically', // price
    orderType: 'ascending', // descending
    pageCount: 0,
    currentPage: 1,
    pageOffset: 0,
    pageLimit: 6
  }

  // #region cart
  clearCart = () => {
    this.setState({ cart: [] })
    this.toggleCart()
  }

  addToCart = (product) => {
    if (product !== undefined) {
      let newCart = [...this.state.cart, product];
      this.setState({ cart: newCart })

      if (this.state.showCart === false) {
        this.toggleCart()
      }
    }
  }

  removeFromCart = (product) => {
    if (product !== undefined) {
      let index = this.state.cart.indexOf(product);

      this.state.cart.splice(index, 1);
      this.setState({ cart: [...this.state.cart] })

      if (this.state.cart.length === 0) {
        this.toggleCart()
      }
    }
  }

  toggleCart = () => {
    this.setState({ showCart: !this.state.showCart });
  }
  // #endregion

  // #region sorting and ordering
  orderProductList = () => {
    let promise = new Promise((resolve, reject) => {
      this.setState({ orderType: this.state.orderType === 'ascending' ? 'descending' : 'ascending' })
      resolve();
    });
    promise.then(() => {
      this.getProductList()
    });
  }

  sortProductList = (property = this.state.sortingType) => {
    if (['alphabetically', 'price'].includes(property)) {
      let promise = new Promise((resolve, reject) => {
        this.setState({ sortingType: property })
        resolve();
      });
      promise.then(() => {
        this.getProductList()
      });
    }
  }

  // #endregion

  // #region filter
  filterProductsByCategory = (category) => {
    let index = this.state.filterByCategories.indexOf(category);
    let filter;
    if (index > -1) {
      this.state.filterByCategories.splice(index, 1);
      filter = [...this.state.filterByCategories]
    } else {
      filter = [...this.state.filterByCategories, category]
    }

    let promise = new Promise((resolve, reject) => {
      this.setState({ filterByCategories: filter })
      resolve();
    });
    promise.then(() => {
      this.getProductList()
    });
  }

  filterProductsByPriceRange = (range) => {
    if (range.min || range.max) {
      let filter;

      if (this.state.filterByPriceRange.min === range.min && this.state.filterByPriceRange.max === range.max) {
        filter = { min: null, max: null };
      } else {
        filter = range;
      }

      let promise = new Promise((resolve, reject) => {
        this.setState({ filterByPriceRange: filter })
        resolve();
      });
      promise.then(() => {
        this.getProductList()
      });
    }
  }

  toggleFilterModal = () => {
    this.setState({ showFilterModal: !this.state.showFilterModal });
  }

  clearFilters = () => {
    let promise = new Promise((resolve, reject) => {
      this.setState({ filterByPriceRange: { min: null, max: null }, filterByCategories: [] })
      resolve();
    });
    promise.then(() => {
      this.getProductList()
    });
  }
  // #endregion

  // #region pagination
  goToNextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1, pageOffset: (this.state.pageOffset + this.state.pageLimit) })
  }

  goToPreviousPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1, pageOffset: (this.state.pageOffset - this.state.pageLimit) })
  }
  // #endregion

  // #region init

  getFeaturedProduct = () => {
    let featured = this.state.products.find((product) => product.featured === true);
    if (featured !== undefined) {
      this.setState({ featuredProduct: featured })
    }
  }

  getProductCategories = () => {
    let categories = [];
    this.state.products.forEach((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category)
      }
    })

    this.setState({ productCategories: categories })
  }

  getPriceRanges = () => {
    let productPrices = [];
    this.state.products.forEach(item => {
      productPrices.push(item.price)
    })
    // get max
    let max = Math.max(...productPrices)

    // define range
    let range;
    switch (max) {
      case (max > 500 && max < 1000):
        range = 200;
        break;
      case (max > 100 && max < 500):
        range = 200;
        break;
      case (max > 50 && max < 100):
        range = 20;
        break;
      case (max > 0 && max < 50):
        range = 10;
        break;
      default:
        range = 100;
        break;
    }

    // compile ranges
    let filterRange = [];
    filterRange.push(0);
    while (range < max) {
      filterRange.push(range);
      range += range;
    }
    filterRange.push(max);

    this.setState({ productPriceRanges: filterRange })
  }

  getProductList = () => {
    let productList = [];

    // remove the featured product
    productList = this.state.products.filter((item) => { return item.featured === false })

    // filter price
    if (this.state.filterByPriceRange.min !== null && this.state.filterByPriceRange.max !== null) {
      productList = productList.filter((item) => { return item.price >= this.state.filterByPriceRange.min && (this.state.filterByPriceRange.max === undefined || item.price <= this.state.filterByPriceRange.max) })
    }

    // filter category
    if (this.state.filterByCategories.length > 0) {
      productList = productList.filter((item) => {
        return this.state.filterByCategories.includes(item.category)
      });
    }

    // sort & order
    if (this.state.sortingType === 'alphabetically') {
      productList = productList.sort((a, b) => {
        return this.state.orderType === 'ascending' ? ('' + a.name).localeCompare(b.name) : ('' + b.name).localeCompare(a.name)
      })
    } else {
      productList = productList.sort((a, b) => {
        return this.state.orderType === 'ascending' ? a.price - b.price : b.price - a.price
      })
    }

    // paginate
    let pageCount = Math.ceil(productList.length / this.state.pageLimit);
    let pageOffset = 0;
    let currentPage = 1;

    this.setState({ productList: productList, pageCount: pageCount, pageOffset: pageOffset, currentPage: currentPage })
  }

  init = async () => {
    this.getFeaturedProduct()
    this.getProductCategories()
    this.getPriceRanges()
    this.getProductList()

    this.setState({ ready: true })
  }
  // #endregion init

  componentDidMount() {

    if (this.state.products.length === 0) {

      this.firebase.auth().signInWithEmailAndPassword(process.env.REACT_APP_FIREBASE_AUTH_EMAIL, process.env.REACT_APP_FIREBASE_AUTH_PASSWORD)
        .then(() => {
          console.log('Signed in...')

          let productRef = this.firebase.database().ref('/');
          productRef.child("products").get()
            .then((snapshot) => {
              if (snapshot.exists()) {
                this.setState({ products: snapshot.val() })
                this.init();
              } else {
                console.log("No products available");
                productRef.child("products")
                  .set(seedDb)
                  .then(() => {
                    console.log('Products added')
                    this.setState({ products: seedDb })
                    this.init();
                  })
                  .catch(err => {
                    console.log(err.message)
                  })
              }
            })
            .catch(err => {
              console.log(err.message)
            })
        })
        .catch((error) => {
          console.log(error.message);

          // spoof the firebase data for offline
          // or integrate local storage
          this.setState({ products: seedDb })
          this.init();
        });

    }
  }

  render() {
    return (
      <>
        {
          this.state.ready === false ?
            <Loading></Loading> :
            <>

              <Nav cart={this.state.cart} showCart={this.state.showCart} removeFromCart={this.removeFromCart} clearCart={this.clearCart} toggleCart={this.toggleCart} ></Nav>

              <Suspense fallback={<Loading></Loading>}>
                <FeaturedProduct featured={this.state.featuredProduct} addToCart={this.addToCart}></FeaturedProduct>
              </Suspense>
              <Sort orderProductList={this.orderProductList} sortProductList={this.sortProductList} sortingType={this.state.sortingType} toggleFilterModal={this.toggleFilterModal}></Sort>

              <section className='container'>
                <div className='row g-0'>

                  <Filter clearFilters={this.clearFilters} toggleFilterModal={this.toggleFilterModal} showFilterModal={this.state.showFilterModal} productCategories={this.state.productCategories} productPriceRanges={this.state.productPriceRanges} filterByCategories={this.state.filterByCategories} filterByPriceRange={this.state.filterByPriceRange} filterProductsByCategory={this.filterProductsByCategory} filterProductsByPriceRange={this.filterProductsByPriceRange}></Filter>

                  <Suspense fallback={<Loading></Loading>}>
                    <ProductList productList={this.state.productList} addToCart={this.addToCart} pageOffset={this.state.pageOffset} pageLimit={this.state.pageLimit} pageCount={this.state.pageCount} currentPage={this.state.currentPage} goToNextPage={this.goToNextPage} goToPreviousPage={this.goToPreviousPage} ></ProductList>
                  </Suspense>

                </div>
              </section>

            </>
        }
      </>
    );
  }
}

export default Home;