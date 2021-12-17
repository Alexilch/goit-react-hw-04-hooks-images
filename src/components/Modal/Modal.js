import { createPortal } from 'react-dom';
import { useEffect } from 'react';
// import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
import '../icons/arrow_back_ios_black_24dp.svg';
import '../icons/arrow_forward_ios_black_24dp.svg';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({
  imageModal,
  onClose,
  onArrowLeft,
  onArrowRight,
}) {
  useEffect(() => {
    const handlekeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowLeft') {
        onArrowLeft();
      }
      if (event.key === 'ArrowRight') {
        onArrowRight();
      }
    };
    window.addEventListener('keydown', handlekeyDown);
    return () => window.removeEventListener('keydown', handlekeyDown);
  }, [onClose, onArrowLeft, onArrowRight]);

  const handleLeft = () => {
    onArrowLeft();
  };

  const handleRight = () => {
    onArrowRight();
  };

  const handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackDropClick}>
      <div className={s.modal}>
        <button
          className={s.leftarrow}
          type="button"
          onClick={() => handleLeft()}
        ></button>
        <img src={imageModal} alt="" />
        <button
          className={s.rightarrow}
          type="button"
          onClick={() => handleRight()}
        ></button>
      </div>
    </div>,
    modalRoot,
  );
}

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handlekeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handlekeyDown);
//   }

//   handlekeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//     if (event.key === 'ArrowLeft') {
//       this.props.onArrowLeft();
//     }
//     if (event.key === 'ArrowRight') {
//       this.props.onArrowRight();
//     }
//   };

//   handleLeft = () => {
//     this.props.onArrowLeft();
//   };

//   handleRight = () => {
//     this.props.onArrowRight();
//   };

//   handleBackDropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { imageModal } = this.props;
//     return createPortal(
//       <div className={s.overlay} onClick={this.handleBackDropClick}>
//         <div className={s.modal}>
//           <button
//             className={s.leftarrow}
//             type="button"
//             onClick={() => this.handleLeft()}
//           ></button>
//           <img src={imageModal} alt="" />
//           <button
//             className={s.rightarrow}
//             type="button"
//             onClick={() => this.handleRight()}
//           ></button>
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

Modal.propTypes = {
  modalImg: PropTypes.string,
  onClose: PropTypes.func,
};
