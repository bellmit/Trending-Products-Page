import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

export class Listings extends Component {
  state = {
    prodList: [],
    hasMoreProds: true,
  };

  getProd = async (_page: string | number | null) => {
    try {
      let url: string;
      if (this.state.prodList.length !== 0) {
        url = 'http://localhost:5000/products/more';
      } else {
        url = 'http://localhost:5000/products/';
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  loadProd = (page: number) => {
    setTimeout(() => {
      this.getProd(page)
        .then((res) => {
          const newList = this.state.prodList.concat(res.results);
          this.setState({ prodList: newList });

          if (res.results.length === 0) {
            this.setState({
              hasMoreProds: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  render() {
    return (
      <div>
        <div className="section">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadProd}
            hasMore={this.state.hasMoreProds}
            useWindow={true}
            loader={
              <div key={0} className="text-center">
                loading data...
              </div>
            }
          >
            {this.state.prodList.map((prod: any, i) => (
              <div key={i}>
                <div># {i + 1}</div>
                <div>{prod.item}</div>
                <div>{prod.count} purchased recently</div>
                {prod.minsDiff > 60 ? (
                  <div>
                    ordered {Math.trunc(prod.minsDiff / 60)} hr{' '}
                    {prod.minsDiff % 60} min ago
                  </div>
                ) : (
                  <div>ordered {prod.minsDiff} min ago</div>
                )}

                <div>
                  ______________________________________________________
                  <br></br>
                  <br></br>
                </div>
              </div>
            ))}
          </InfiniteScroll>
          {this.state.hasMoreProds ? (
            ''
          ) : (
            <div className="text-center">
              no more products ordered recently :(
              <br></br>
              <br></br>
              <br></br>
            </div>
          )}
        </div>
      </div>
    );
  }
}
