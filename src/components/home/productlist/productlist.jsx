import React, { Component } from 'react';
import { formatCurrency, pexelsBaseUrl } from '../../../utils/common';
import Pagination from '../pagination/pagination';
import './productlist.scss'

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    return {
      productList: props.productList,
      addToCart: props.addToCart,
      pageOffset: props.pageOffset,
      pageLimit: props.pageLimit,
      pageCount: props.pageCount,
      currentPage: props.currentPage,
      goToNextPage: props.goToNextPage,
      goToPreviousPage: props.goToPreviousPage
    };
  }

  render() {
    return (
      <>
        <div className='productlist col-md-9 col-12'>
          <div className='list row'>
            {
              this.state.productList.length > 0 ?
                this.state.productList.slice(((this.state.currentPage - 1) * this.state.pageLimit), (this.state.pageLimit * this.state.currentPage)).map((item, index) => (
                  <div key={index} className='item col-md-4 col-12'>
                    <div className='image'>
                      <img src={`${pexelsBaseUrl}${item.image.src}`} alt={item.image.alt} />

                      {
                        item.bestseller &&
                        <div className='bestseller'>
                          Best Seller
                        </div>
                      }

                      <button className='addToCart' onClick={() => this.state.addToCart(item)}>
                        ADD TO CART
                      </button>
                    </div>
                    <h5 className='category'>{item.category}</h5>
                    <h3 className='name'>{item.name}</h3>
                    <h1 className='price'>{formatCurrency(item.currency)}{parseFloat(item.price).toFixed(2)}</h1>
                  </div>
                ))
                : <div className='noproducts'>No Products</div>
            }
          </div>

          {
            this.state.productList.length > 0 &&
            <Pagination pageCount={this.state.pageCount} currentPage={this.state.currentPage} goToNextPage={this.state.goToNextPage} goToPreviousPage={this.state.goToPreviousPage}></Pagination>
          }

        </div>

      </>
    );
  }
}

export default ProductList;