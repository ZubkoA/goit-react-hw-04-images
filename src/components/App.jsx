import { useState, useEffect } from 'react';
import { getSearchImg } from '../api/SearchFile';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import css from './App.module.css';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import React from 'react';

const App = () => {
  const [searchImg, setSearchImg] = useState('');
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const [tags, setTags] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);

  //

  useEffect(() => {
    if (!searchImg) {
      return;
    }
    setIsLoading(true);
    getSearchImg(searchImg, page)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('Did not find'));
      })
      .then(data => {
        if (data.hits.length === 0) {
          toast.warn(`Didn't find ${searchImg}`);
        } else setHits(prev => [...prev, ...data.hits]);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [page, searchImg]);

  const closeModal = () => {
    setIsShowModal(false);
  };

  const handleSearch = searchImg => {
    setHits([]);
    setSearchImg(searchImg);
    setPage(1);
    setError(null);
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

      {hits?.length > 0 && <ImageGallery hits={hits} onData={savedModal} />}
      {hits?.length > 0 && !isLoading && (
        <Button handleClick={handleAdd} title="Load more" />
      )}

      {isShowModal && <Modal onClose={closeModal} tags={tags} url={url} />}
    </div>
  );
};

export default App;
