import React, { Component } from 'react';
import { bejamas, cart as cartIcon, close } from '../../../assets/icons/icons';
import { formatCurrency, pexelsBaseUrl } from '../../../utils/common';
import './nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    return {
      cart: props.cart,
      showCart: props.showCart,
      toggleCart: props.toggleCart,
      clearCart: props.clearCart,
      removeFromCart: props.removeFromCart
    };
  }

  render() {
    return (
      <>
        <header className='container'>
          <div className='navv h-100 d-flex justify-content-between align-items-center'>
            <div className='logo d-flex align-items-center'>
              <img src={bejamas} alt="Logo" />
            </div>
            <button onClick={() => this.state.toggleCart()} className='cart-btn position-relative'>
              <img src={cartIcon} alt="Cart" />
              {this.state.cart.length > 0 &&
                <div className='cart-items-count position-absolute end-0 bottom-0'>{this.state.cart.length}</div>
              }
            </button>
          </div>

          <div className='hr'>&nbsp;</div>

          {this.state.showCart === true &&
            <div className='cart'>
              <div className='cart-items'>

                {
                  this.state.cart.length > 0 &&
                  <div className='cart-items-list'>
                    <ul>
                      {
                        this.state.cart.length > 0 &&
                        this.state.cart.map((item, index) => (
                          <div key={index} >

                            <div className='d-flex justify-content-end'>
                              <button onClick={() => this.state.removeFromCart(item)} className='cart-close-btn'>
                                <img src={close} alt="Close" />
                              </button>
                            </div>

                            <li className='cart-item'>
                              <div>
                                <span className='item-name d-block'>{item.name}</span>
                                <span className='item-price d-block'>{formatCurrency(item.currency)}{parseFloat(item.price).toFixed(2)}</span>
                              </div>
                              <img src={`${pexelsBaseUrl}${item.image.src}`} alt={item.image.alt} />
                            </li>

                            <div className='hr'>&nbsp;</div>
                          </div>
                        ))
                      }
                    </ul>
                  </div>
                }

                <button className='cart-clear-btn' onClick={() => this.state.clearCart()}>CLEAR</button>
              </div>
            </div>
          }
        </header>
      </>
    )
  }
}

export default Nav;