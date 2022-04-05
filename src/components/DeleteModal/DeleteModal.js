import React from "react";
import Backdrop from "../backdrop/backdrop";
import CustomButton from "../custom-button/custom-button";
import DeleteModalIllustration from "../svg/DeleteModalIllustration/DeleteModalIllustration";

import "./delete-modal.scss";

const DeleteModal = ({ title, active, deleteHandler, toggleDeleteModal }) => {
  return (
    <>
      <div className={active ? `delete-modal active` : "delete-modal"}>
        <div className="delete-modal-content">
          <div className="delete-modal-content_header">
            <div className="modal-close">
              <i
                className="material-icons close-icon"
                onClick={() => toggleDeleteModal()}
              >
                cancel
              </i>
            </div>
          </div>
          <div className="delete-modal-content_illustration">
            <DeleteModalIllustration />
          </div>
          <h3>Are you sure you want to delete '{title}'?</h3>
          <p>This action cannot be undone!</p>
          <CustomButton onClick={() => deleteHandler()}>
            Yes, delete!
          </CustomButton>
          <CustomButton onClick={() => toggleDeleteModal()}>
            No, take me back!
          </CustomButton>
        </div>
      </div>
      {active && <Backdrop />}
    </>
  );
};

export default DeleteModal;
