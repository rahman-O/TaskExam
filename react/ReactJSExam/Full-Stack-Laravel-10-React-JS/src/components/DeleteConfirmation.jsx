import React, { useState } from "react";
import { Alert } from "@material-tailwind/react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteConfirmation = (props) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Function to handle successful deletion
  const handleDeleteSuccess = () => {
    setShowSuccessAlert(true);

    // You can add any additional logic here for handling the successful deletion

    // Close the success alert after a few seconds (e.g., 3 seconds)
    setTimeout(() => {
      setShowSuccessAlert(false);
      props.closeDeleteConfirmationModalHandler(); // Close the modal after success
    }, 3000);
  };

  return (
    <>
      <Modal
        show={props.showModal}
        onHide={() => {
          props.closeDeleteConfirmationModalHandler();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.closeDeleteConfirmationModalHandler();
            }}
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteSuccess(); // Trigger success and close modal
            }}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display success alert when `showSuccessAlert` is true */}
      {showSuccessAlert && (
        <Alert color="green">Item deleted successfully.</Alert>
      )}
    </>
  );
};

export default DeleteConfirmation;
