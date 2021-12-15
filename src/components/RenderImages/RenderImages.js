import React, { useState, useEffect } from 'react';
// import {Component} from 'react'
import PropTypes from 'prop-types';

import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
import Initial from '../Initial';
import Button from '../Button';
import NotFound from '../NotFound';
import API from '../../services/searchAPI';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export default function RenderImages({ searchQuery }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus(Status.PENDING);

    API.imagesAPI({ searchQuery, page })
      .then(query => {
        if (query.hits.length === 0) {
          return Promise.reject(
            new Error(`Results for: ${searchQuery} not found.`),
          );
        }
        setImages(prevImages => [...prevImages, ...query.hits]);
        setStatus(Status.RESOLVED);
        onScroll();
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery, page]);

  useEffect(() => {
    resetImages();
  }, [searchQuery]);

  const onScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
      block: 'end',
    });
  };

  const resetImages = () => {
    setImages([]);
    setPage(1);
  };

  const handleLoadmoreButton = () => {
    setPage(prevPage => prevPage + 1);
    onScroll();
  };

  if (status === Status.IDLE) {
    return <Initial />;
  }
  if (status === Status.PENDING) {
    return (
      <>
        <Loader />
        <ImageGallery images={images} />
      </>
    );
  }
  if (status === Status.REJECTED) {
    return <NotFound onError={error.message} />;
  }
  if (status === Status.RESOLVED) {
    return (
      <>
        <ImageGallery images={images} />
        <Button onClick={handleLoadmoreButton} />
        {/* {status === Status.PENDING ? (<Loader />) : ( <Button onClick={handleLoadmoreButton} />)} */}
      </>
    );
  }
}

RenderImages.propTypes = {
  searchQuery: PropTypes.string,
};

// export default class RenderImages extends Component {
//   state = {
//     page: 1,
//     images: [],
//     error: null,
//     status: 'idle',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevSearch = prevProps.searchQuery;
//     const curentSearch = this.props.searchQuery;

//     const prevPage = prevState.page;
//     const curentPage = this.state.page;

//     if (prevSearch !== curentSearch) {
//       this.resetImages();
//       this.onSearch();
//       this.setState({ status: 'pending' });
//     }
//     if (prevPage !== curentPage) {
//       this.onSearch();
//       this.setState({ status: 'pending' });
//     }
//   }

//   onSearch() {
//     this.setState({ status: 'pending' });
//     const { page } = this.state;
//     const { searchQuery } = this.props;

//     API(searchQuery, page)
//       .then(query => {
//         if (query.hits.length === 0) {
//           return Promise.reject(
//             new Error(`Results for: ${searchQuery}  not found.`),
//           );
//         }
//         this.setState({
//           images: [...this.state.images, ...query.hits],
//           status: 'resolved',
//         });
//         this.onScroll();
//       })
//       .catch(error => this.setState({ error, status: 'rejected' }));
//   }

//   onScroll = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//       block: 'end',
//     });
//   };

//   resetImages = () => {
//     this.setState({ images: [], page: 1 });
//   };

//   handleLoadmoreButton = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//     this.onScroll();
//   };

//   render() {
//     const { status, images, error } = this.state;
//     if (status === 'idle') {
//       return <Initial />;
//     }
//     if (status === 'pending') {
//       return (
//         <>
//           <Loader />
//           <ImageGallery images={images} />
//         </>
//       );
//     }
//     if (status === 'rejected') {
//       return <NotFound onError={error.message} />;
//     }
//     if (status === 'resolved') {
//       return (
//         <>
//           <ImageGallery images={images} />
//           <Button onClick={this.handleLoadmoreButton} />
//         </>
//       );
//     }
//   }
// }
