import React from 'react';
import { Helmet } from 'react-helmet-async';

const Modal = ({ closeModal, children }) => {
  return (
    <div className="parent-of-model">
      <Helmet>
        <style
          type='text/css'>
          {`.parent-of-model {
                position: fixed;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .modal {
                background-color: white;
                box-shadow: 0 5px 40px teal;
                width: 400px;
                height: 330px;
                border-radius: 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                animation : mymove .8s;
                overflow-y: auto;
            }

            @keyframes mymove {
                0% {transform: translateY(-100vh); scale: 0}
                100% {transform: translateY(0); scale: 1}
            }

            .close .fa-xmark {
                font-size: 28px;
                color: #444;
                position: absolute;
                top: 15px;
                right: 20px;
                transition: .3s;
            }

            .close .fa-xmark:hover {
                color: orange;
                transform: rotate(180deg);
                font-size: 30px;
          }`}
        </style>
      </Helmet>


      <form className={`modal`}>
        <div
          onClick={() => {
            closeModal()
          }}
          className="close">
          <i className="fa-solid fa-xmark"></i>
        </div>

        {children}

      </form>
    </div>
  );
}

export default Modal;
