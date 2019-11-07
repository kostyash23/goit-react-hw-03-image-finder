import React, { Component } from 'react';
import Gallery from '../Gallery/Gallery.jsx';
import Modal from '../Modal/Modal.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import styles from './App.module.css';
import axios from 'axios';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    showModal: false,
    largreimg: '',
    pageNumber: 1,
  };

  fetchImages = query => {
    const { pageNumber } = this.state;
    this.setState({ query: query });

    this.getImages(pageNumber, query)
      .then(data => {
        this.setState({ images: data });
      })
      .catch(err => console.log(err));
  };

  getImages = (pageNumber, query = '') => {
    return axios
      .get(
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=12&key=14172292-2bdae1bcfd9be2e5190759c59`,
      )
      .then(response => response.data.hits)
      .catch(err => console.log(err));
  };

  openModal = e => {
    this.setState({
      largreimg: e.target.parentElement.dataset.img,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ pageNumber: prevState.pageNumber + 1 }),
      () => {
        const { query, pageNumber } = this.state;
        this.getImages(pageNumber, query)
          .then(data => {
            this.setState(prev => ({ images: [...prev.images, ...data] }));
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
          })
          .catch(err => console.log(err));
      },
    );
  };

  render() {
    const { images, showModal, largreimg } = this.state;

    return (
      <div className="app">
        <SearchForm onSubmit={this.fetchImages} />
        {showModal && <Modal closeModal={this.closeModal} img={largreimg} />}
        {images.length > 0 && (
          <Gallery gallery={images} openModal={this.openModal} />
        )}

        <button
          type="button"
          className={styles.button}
          onClick={this.handleLoadMore}
        >
          Load more
        </button>
      </div>
    );
  }
}
