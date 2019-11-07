import React, { Component, createRef } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
//import { Test } from './Modal.styles';

class Modal extends Component {
  overlayRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = e => {
    const { closeModal } = this.props;

    if (e.keyCode === 27) closeModal();
  };

  handleClick = e => {
    const { closeModal } = this.props;
    if (e.target === this.overlayRef.current) closeModal();
  };

  render() {
    const { img } = this.props;
    return (
      <div
        className={styles.overlay}
        onClick={this.handleClick}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
        ref={this.overlayRef}
      >
        <div className={styles.modal}>
          <img src={img} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
