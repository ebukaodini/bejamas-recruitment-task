import React, { Component } from 'react';
import { filter, order } from '../../../assets/icons/icons';
import './sort.scss'

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    return {
      orderProductList: props.orderProductList,
      sortProductList: props.sortProductList,
      sortingType: props.sortingType,
      toggleFilterModal: props.toggleFilterModal
    };
  }

  render() {
    return (
      <>
        <section className='sort-and-order container'>

          <div className='title'>
            <span>Photography</span>
            <span>&nbsp;/&nbsp;</span>
            <span>Premium Photos</span>
          </div>

          <div className='sort'>
            <button className='order-btn' onClick={() => this.state.orderProductList()}>
              <img src={order} alt="Order" />
            </button>

            <span>Sort By</span>

            <select value={this.state.sortingType} onChange={(e) => this.state.sortProductList(e.target.value)}>
              <option value="alphabetically">A-Z</option>
              <option value="price">Price</option>
            </select>
          </div>

          <div className='mobile-sort'>
            <button className='filter-btn' onClick={() => this.state.toggleFilterModal()}>
              <img src={filter} alt="Order" />
            </button>
          </div>

        </section>
      </>
    );
  }
}

export default Sort;