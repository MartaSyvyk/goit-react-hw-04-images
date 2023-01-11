import React from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'API/API';
import { Button } from './Button/Button';
import { FetchError } from './Error/Error';
import css from '../styles.module.css';
import { BallTriangle } from 'react-loader-spinner';

export class App extends React.Component {
  state = {
    images: null,
    searchedImage: '',
    status: 'idle',
    isModalOpen: false,
    page: 1,
    currentImage: '',
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchedImage !== this.state.searchedImage ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        status: 'pending',
      });

      fetchImages(this.state.searchedImage, this.state.page)
        .then(response => {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };
  handleOnLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  formSubmitHandler = query => {
    if (this.state.searchedImage === query) {
      return;
    }
    this.setState({
      searchedImage: query,
      images: '',
      page: 1,
    });
  };
  handleImageClick = imageId => {
    this.setState({
      currentImage: this.state.images.filter(image => image.id === imageId)[0]
        .largeImageURL,
    });
    this.toggleModal();
  };

  render() {
    return (
      <div className={css.App}>
        {this.state.isModalOpen && (
          <Modal onClose={this.toggleModal} url={this.state.currentImage} />
        )}
        <Searchbar submitHandler={this.formSubmitHandler} />
        {this.state.images && (
          <ImageGallery
            data={this.state.images}
            handleClick={this.handleImageClick}
          />
        )}
        {this.state.status === 'pending' && (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#3f51b5"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '50px',
              marginBottom: '50px',
            }}
            visible={true}
          />
        )}
        {this.state.status === 'rejected' && <div>{this.state.error}</div>}
        {this.state.images && <Button handleClick={this.handleOnLoadMore} />}
        {this.state.status === 'rejected' && (
          <FetchError errorMessage={this.state.searchedImage} />
        )}
      </div>
    );
  }
}
