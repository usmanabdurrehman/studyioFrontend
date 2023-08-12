import React, { memo } from 'react';
import ReactModal from 'react-modal';

import { Button } from 'Components';

import { classNames } from 'utils';
import styles from './Modal.module.css';

const Modal = memo(({ modal, closeModal }) => {
  const { text, buttons, onConfirm } = modal?.modalInfo || {};

  return (
    <ReactModal
      isOpen={
        !!(modal?.showModal && (modal?.modalInfo || modal?.modalComponent))
      }
      className={classNames({
        [styles.modal]: true,
        [styles.componentModel]: modal?.modalComponent,
      })}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick
      onRequestClose={closeModal}
    >
      {modal?.modalComponent ? (
        modal?.modalComponent
      ) : (
        <>
          <h4 className={styles.header}>{text}</h4>
          {buttons && (
            <div className={styles.buttonWrapper}>
              {buttons.map(({ color, text: buttonText, confirm }) => (
                <Button
                  variant="filled"
                  color={color}
                  onClick={() => {
                    if (confirm) {
                      onConfirm();
                      closeModal();
                    } else {
                      closeModal();
                    }
                  }}
                  classes={{ button: styles.button }}
                >
                  {buttonText}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </ReactModal>
  );
});

export default Modal;
