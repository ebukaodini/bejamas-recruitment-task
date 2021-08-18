import React, { Component } from 'react';
import { pexelsBaseUrl } from '../../../utils/common';
import './featured.scss'

class FeaturedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    return { featured: props.featured, addToCart: props.addToCart };
  }

  render() {
    return (
      <>
        {
          this.state.featured &&
          <section className='featured-product container'>

            <div className='title d-flex justify-content-between align-items-center'>
              <h2>{this.state.featured.name}</h2>
              <button onClick={() => this.state.addToCart(this.state.featured)}>ADD TO CART</button>
            </div>

            <div className='image'>
              <img src={`${pexelsBaseUrl}${this.state.featured.image.src}`} alt={this.state.featured.image.alt} loading='eager' />
              <div className='label'>Photo of the day</div>
            </div>

            <div className='mobile-add-to-cart'>
              <button onClick={() => this.state.addToCart(this.state.featured)}>ADD TO CART</button>
            </div>

            <div className='metadata row no-gutter g-0'>

              <div className='about col-md-7 col-12'>
                <h5>About the {this.state.featured.name}</h5>
                <h6>{this.state.featured.category}</h6>
                <p>{this.state.featured.details.description}</p>
              </div>

              <div className='col-md-5 col-12'>

                <div className='recommendations'>
                  <h5>People also buy</h5>
                  <div className='images'>
                    {
                      this.state.featured.details.recommendations &&
                      this.state.featured.details.recommendations.map((item, index) => (
                        <div key={index}>
                          <img src={`${pexelsBaseUrl}${item.src}`} alt={item.alt} loading='lazy' />
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div className='details'>
                  <h5>Details</h5>
                  <div className='dimensions'>Size: {this.state.featured.details.dimmentions.width} x {this.state.featured.details.dimmentions.height}</div>
                  <div className='size'>Size: {Math.floor(this.state.featured.details.size / 1024)} mb</div>
                </div>

              </div>

            </div>

            <div className='hr'>&nbsp;</div>
          </section>
        }
      </>
    );
  }
}

export default FeaturedProduct;