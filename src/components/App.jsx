import { useState, useEffect } from 'react';
import { getSearchImg } from '../api/SearchFile';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import css from './App.module.css';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer } from 'react-toastify';

import React from 'react';

const App = () => {
  const [searchImg, setSearchImg] = useState('');
  const [hits, setHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const [tags, setTags] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);
  //

  useEffect(() => {
    setIsLoading(true);
    getSearchImg(searchImg, page)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('Did not find'));
      })
      .then(data => {
        hits === null
          ? setHits(data.hits)
          : setHits(prev => [...prev, ...data.hits]);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [page, searchImg, hits]);

  const closeModal = () => {
    setIsShowModal(false);
  };

  const handleSearch = searchImg => {
    setSearchImg(searchImg);
    setHits(null);
    setPage(1);
  };

  const handleAdd = () => {
    setPage(prev => prev + 1);
  };
  const savedModal = (tags, url) => {
    setIsShowModal(true);
    setTags(tags);
    setUrl(url);
  };

  return (
    <div className={css.App}>
      <ToastContainer />
      {error && <h1>{error.message}</h1>}
      <Searchbar handleSearch={handleSearch} />
      {isLoading && <Loader />}

      {hits !== null && <ImageGallery hits={hits} onData={savedModal} />}
      {hits?.length > 0 && <Button handleClick={handleAdd} title="Load more" />}
      {hits?.length === 0 && (
        <div style={{ fontSize: '24px', fontWeight: '600' }}>
          No results {searchImg}!
        </div>
      )}
      {isShowModal && <Modal onClose={closeModal} tags={tags} url={url} />}
    </div>
  );
};

export default App;
