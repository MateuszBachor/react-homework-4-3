import React from 'react';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Gallery from './ImageGallery/ImageGallery';
import styles from './App.module.css';
import Button from './Button/Button';
// import fetchImage from './Services/fetchImage';      Error GitHub
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import axios from 'axios';

export const App = () => {
  // state = {
  //   query: '',
  //   page: 1,
  //   images: [],
  //   modalImg: '',
  //   isLoad: false,
  // };
  let [query, setQuery] = useState('');
  let [page, setPage] = useState(1);
  let [images, setImages] = useState([]);
  let [modalImg, setModalImg] = useState('');
  let [isLoad, setIsLoad] = useState(false);
  let [isModalState, setIsModalState] = useState(false);

  const fetchImage = async (query, page) => {
    const baseUrl = 'https://pixabay.com/api';
    try {
      const response = await axios.get(
        `${baseUrl}?key=28406091-8008b7c1afae3beb3d4e940a7&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12}`
      );
      return response.data;
    } catch (error) {
      console.log('Error: ' + error);
    }
  };
  const renderGallery = async () => {
    const response = await fetchImage(query, page);
    falseLoad();

    if (page === 1) {
      setImages((images = response.hits));
    }
    if (page > 1) {
      setImages((images = [...images, ...response.hits]));
    }
  };
  useEffect(() => {
    renderGallery();
  }, []);
  useEffect(() => {
    renderGallery();
  }, [query, page]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    let queryhandleSubmit = form.elements.query.value;
    setQuery((query = queryhandleSubmit));
    console.log(query);
    setPage((page = 1));
    form.reset();
    trueLoad();
  };

  const loadMore = () => {
    setPage((page = page + 1));
  };
  const showModal = e => {
    setModalImg((modalImg = e.target.dataset.source));
    setIsModalState((isModalState = true));
  };
  const clsModal = () => {
    setIsModalState((isModalState = false));
  };
  const trueLoad = () => {
    setIsLoad((isLoad = true));
  };
  const falseLoad = () => {
    setIsLoad((isLoad = false));
  };

  return (
    <div className={styles.App}>
      <Searchbar submitForm={handleSubmit} />
      {isLoad ? (
        <Loader />
      ) : (
        <Gallery>
          <ImageGalleryItem imgArray={images} showModal={showModal} />
        </Gallery>
      )}

      {images.length !== 0 && isLoad === false ? (
        <Button click={loadMore} />
      ) : (
        ''
      )}
      {images.length === 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src="https://webmarketingschool.com/wp-content/uploads/2018/03/nojobsfound.png"
            alt=""
          />
        </div>
      )}
      {isModalState === true ? (
        <Modal modalImg={modalImg} clsModal={clsModal} />
      ) : (
        ''
      )}
    </div>
  );
};
