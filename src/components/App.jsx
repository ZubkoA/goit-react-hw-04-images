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

  const [modal, setModal] = useState({ url: '', tags: '' });
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
        // if (hits === null) return setHits(data);
        // return;
        // setHits(prev => [...prev, data]);
        hits === null ? setHits(data) : setHits(prev => [...prev, data]);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [searchImg, page, hits]);

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
    setModal(tags, url);
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
      {isShowModal && <Modal onClose={closeModal} modal={modal} />}
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     searchImg: '',
//     hits: null,
//     isLoading: false,
//     isShowModal: false,
//     page: 1,
//     perPage: 12,
//     modal: { url: '', tags: '' },
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevState.searchImg;
//     const prevPage = prevState.page;
//     const { page, perPage, hits, searchImg } = this.state;

//     if (prevName !== searchImg || prevPage !== page) {
//       this.setState({ isLoading: true });
//       getSearchImg(searchImg, page, perPage)
//         .then(res => {
//           if (res.ok) {
//             return res.json();
//           }
//           return Promise.reject(new Error('Did not find'));
//         })
//         .then(data => {
//           if (hits === null) return this.setState({ hits: data.hits });
//           return this.setState({ hits: [...prevState.hits, ...data.hits] });
//         })
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ isLoading: false }));
//     }
//   }
//   closeModal = () => {
//     this.setState({ isShowModal: false });
//   };

//   handleSearch = searchImg => {
//     this.setState({ searchImg, hits: null, page: 1 });
//   };

//   handleAdd = () => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1,
//       };
//     });
//   };
//   savedModal = (tags, url) => {
//     this.setState({ modal: { tags, url }, isShowModal: true });
//   };

//   render() {
//     const { hits, isLoading, isShowModal, modal, error, searchImg } =
//       this.state;
//     return (
//       <div className={css.App}>
//         <ToastContainer />
//         {error && <h1>{error.message}</h1>}
//         <Searchbar handleSearch={this.handleSearch} />
//         {isLoading && <Loader />}

//         {hits !== null && <ImageGallery hits={hits} onData={this.savedModal} />}
//         {hits?.length > 0 && (
//           <Button handleClick={this.handleAdd} title="Load more" />
//         )}
//         {hits?.length === 0 && (
//           <div style={{ fontSize: '24px', fontWeight: '600' }}>
//             No results {searchImg}!
//           </div>
//         )}
//         {isShowModal && <Modal onClose={this.closeModal} modal={modal} />}
//       </div>
//     );
//   }
// }

// export default App;
