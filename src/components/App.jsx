import React, { useState, useEffect } from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'API/API';
import { Button } from './Button/Button';
import { FetchError } from './Error/Error';
import css from '../styles.module.css';
import { BallTriangle } from 'react-loader-spinner';

  const statusOptions = {
    idle: 'idle',
    pending: 'pending',
    rejected: 'rejected',
    resolved: 'resolved',
  };
export const App = () => {


  const [images, setImages] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(statusOptions.idle);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    {
      setStatus(statusOptions.pending);
      fetchImages(query, page)
        .then(response => {
          setImages(prevState => [...prevState, ...response.hits]);
          setStatus(statusOptions.resolved);
        })
        .catch(error => setStatus(statusOptions.rejected), setError(error));
    }
  }, [page, query]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const handleOnLoadMore = () => {
    setPage(page + 1);
  };
  const formSubmitHandler = searchedImage => {
    if (query === searchedImage) {
      return;
    }

    setQuery(searchedImage);
    setImages('');
    setPage(1);
  };
  const handleImageClick = imageId => {
    setCurrentImg(
      images.filter(image => image.id === imageId)[0].largeImageURL
    );
    toggleModal();
  };

  return (
    <div className={css.App}>
      {modal && <Modal onClose={toggleModal} url={currentImg} modal={modal} />}
      <Searchbar submitHandler={formSubmitHandler} />
      {images && <ImageGallery data={images} handleClick={handleImageClick} />}
      {status === 'pending' && (
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
      {status === 'rejected' && <div>{error}</div>}
      {images && <Button handleClick={handleOnLoadMore} />}
      {status === 'rejected' && <FetchError errorMessage={query} />}
    </div>
  );
};
