import React, { Component } from 'react';
import { checkbox, checkedbox, close } from '../../../assets/icons/icons';
import { formatCurrency } from '../../../utils/common';
import './filter.scss'

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    return {
      productCategories: props.productCategories,
      productPriceRanges: props.productPriceRanges,
      filterByCategories: props.filterByCategories,
      filterByPriceRange: props.filterByPriceRange,
      filterProductsByCategory: props.filterProductsByCategory,
      filterProductsByPriceRange: props.filterProductsByPriceRange,
      showFilterModal: props.showFilterModal,
      toggleFilterModal: props.toggleFilterModal,
      clearFilters: props.clearFilters
    };
  }

  render() {
    return (
      <>
        <div className='filter col-md-3 col-12'>

          <h6 className='title'>Category</h6>
          <ul className='category'>
            {
              this.state.productCategories &&
              this.state.productCategories.map((item, index) => (
                <li className='item' key={index}>
                  <button onClick={() => this.state.filterProductsByCategory(item)}>
                    {
                      this.state.filterByCategories.includes(item) ?
                        <img src={checkedbox} alt="Checkbox" />
                        :
                        <img src={checkbox} alt="Checkbox" />
                    }
                    <span>{item}</span>
                  </button>
                </li>
              ))
            }
          </ul>

          <hr />

          <h6 className='title'>Price range</h6>
          <ul className='price-range'>
            {
              this.state.productPriceRanges &&
              this.state.productPriceRanges.map((item, index) => (
                <li className='item' key={index}>

                  <button onClick={() => this.state.filterProductsByPriceRange({ min: item, max: this.state.productPriceRanges[index + 1] })}>

                    {
                      this.state.filterByPriceRange.min === item && this.state.filterByPriceRange.max === this.state.productPriceRanges[index + 1] ?
                        <img src={checkedbox} alt="Checkbox" />
                        : <img src={checkbox} alt="Checkbox" />
                    }

                    <span>
                      {
                        index === 0 ?
                          `Lower than ${formatCurrency('USD')}${this.state.productPriceRanges[index + 1]}`
                          : index === this.state.productPriceRanges.length - 1 ?
                            `More than ${formatCurrency('USD')}${item}`
                            : `${formatCurrency('USD')}${item} - ${formatCurrency('USD')}${this.state.productPriceRanges[index + 1]}`
                      }
                    </span>
                  </button>
                </li>
              ))
            }
          </ul>

        </div>

        <div className={`mobile-filter ${this.state.showFilterModal ? 'show' : ''}`}>

          <div className='filter-modal'>

            <div className="filters">
              <div className='title'>
                <h5 className='title'>Filter</h5>
                <button onClick={() => this.state.toggleFilterModal()} className='cart-close-btn'>
                  <img src={close} alt="Close" />
                </button>
              </div>

              <h6 className='title'>Category</h6>
              <ul className='category'>
                {
                  this.state.productCategories &&
                  this.state.productCategories.map((item, index) => (
                    <li className='item' key={index}>
                      <button onClick={() => this.state.filterProductsByCategory(item)}>
                        {
                          this.state.filterByCategories.includes(item) ?
                            <img src={checkedbox} alt="Checkbox" />
                            :
                            <img src={checkbox} alt="Checkbox" />
                        }
                        <span>{item}</span>
                      </button>
                    </li>
                  ))
                }
              </ul>

              <hr />

              <h6 className='title'>Price range</h6>
              <ul className='price-range'>
                {
                  this.state.productPriceRanges &&
                  this.state.productPriceRanges.map((item, index) => (
                    <li className='item' key={index}>

                      <button onClick={() => this.state.filterProductsByPriceRange({ min: item, max: this.state.productPriceRanges[index + 1] })}>

                        {
                          this.state.filterByPriceRange.min === item && this.state.filterByPriceRange.max === this.state.productPriceRanges[index + 1] ?
                            <img src={checkedbox} alt="Checkbox" />
                            : <img src={checkbox} alt="Checkbox" />
                        }

                        <span>
                          {
                            index === 0 ?
                              `Lower than ${formatCurrency('USD')}${this.state.productPriceRanges[index + 1]}`
                              : index === this.state.productPriceRanges.length - 1 ?
                                `More than ${formatCurrency('USD')}${item}`
                                : `${formatCurrency('USD')}${item} - ${formatCurrency('USD')}${this.state.productPriceRanges[index + 1]}`
                          }
                        </span>
                      </button>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="filter-actions">
              <div className='hr'>&nbsp;</div>
              <div className="actions">
                <button className='cart-clear-btn' onClick={() => this.state.clearFilters()}>CLEAR</button>
                <button className='cart-clear-btn' onClick={() => this.state.toggleFilterModal()}>SAVE</button>
              </div>
            </div>

          </div>
        </div>

      </>
    );
  }
}

export default Filter;