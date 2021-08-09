import React, { Component } from 'react';
import { pageleft, pageright } from '../../../assets/icons/icons';
import './pagination.scss';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    return {
      pageCount: props.pageCount,
      currentPage: props.currentPage,
      goToNextPage: props.goToNextPage,
      goToPreviousPage: props.goToPreviousPage
    }
  }

  render() {
    let pages = [], count = 1;
    while (count <= this.state.pageCount) {
      pages.push(count);
      count++;
    }

    return (
      <>
        <section className='pagination'>
          <div className="pages">

            {
              this.state.currentPage > 1 &&
              <button className="nav" onClick={() => this.state.goToPreviousPage()}>
                <img src={pageleft} alt="Page Left" />
              </button>
            }
            <ul className='pagelist'>
              {
                this.state.pageCount > 0 &&
                pages.map((item, index) => (
                  <li key={index} className={this.state.currentPage === item ? 'active' : ''}>{item}</li>
                ))
              }
            </ul>
            {
              this.state.currentPage < this.state.pageCount &&
              <button className="nav" onClick={() => this.state.goToNextPage()}>
                <img src={pageright} alt="Page Right" />
              </button>
            }
          </div>
        </section>
      </>
    );
  }
}

export default Pagination;