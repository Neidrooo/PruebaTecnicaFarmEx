import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ModalStep1({
  show,
  handleClose,
  handleOptionChange,
  selectedOption,
  handleFormSubmit,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Check
                type="radio"
                label="Seguro 1"
                name="options"
                value="Seguro 1"
                checked={selectedOption === "Seguro 1"}
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="Seguro 2"
                name="options"
                value="Seguro 2"
                checked={selectedOption === "Seguro 2"}
                onChange={handleOptionChange}
              />

              <Form.Check
                type="radio"
                label="Convenio salud"
                name="options"
                value="Convenio salud"
                checked={selectedOption === "Convenio salud"}
                onChange={handleOptionChange}
                className="mb-0 mr-3"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Registrarme
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalStep1;
