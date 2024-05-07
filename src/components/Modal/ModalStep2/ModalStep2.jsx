import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { medicamentos } from "../../../constants/medicamentos";
import { createUser } from "../../../api";
import { validate } from "rut.js";
const schema = yup
  .object({
    nombre: yup
      .string()
      .required("El nombre es obligatorio")
      .matches(
        /^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
        "Solo se permiten letras y espacios"
      ),
    rut: yup
      .string()
      .required("El RUT con DV es obligatorio")
      .matches(/^\d{1,8}[-|‐][0-9kK]$/, "Formato de RUT debe ser XXXXXXXX-X")
      .test("valid-rut", "El RUT no es válido", (value) => validate(value)),
    email: yup
      .string()
      .required("El correo electrónico es obligatorio")
      .email("Debe ser un correo electrónico válido"),
    medicamentos: yup
      .array()
      .min(1, "Debe seleccionar al menos un medicamento"),
  })
  .required();

function ModalStep2({ show, handleClose, handleSubmit, formData }) {
  const [selectedMedicamentos, setSelectedMedicamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicamentos, setFilteredMedicamentos] =
    useState(medicamentos);
  const {
    register,
    handleSubmit: handleValidateSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleMedicamentoChange = (event) => {
    const value = event.target.value;
    let newSelection;

    if (selectedMedicamentos.includes(value)) {
      newSelection = selectedMedicamentos.filter((item) => item !== value);
    } else {
      newSelection = [...selectedMedicamentos, value];
    }
    setSelectedMedicamentos(newSelection);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = medicamentos.filter((medicamento) =>
      medicamento.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredMedicamentos(filtered);
  };

  const submitAndClose = async (e) => {
    e.preventDefault();
    handleValidateSubmit(async (data) => {
      try {
        const formattedData = new Date(formData.fecha_nacimiento);
        const formData2 = {
          ...formData,
          fecha_nacimiento: formattedData,
        };
        const response = await createUser(formData2);
        console.log("Respuesta de la API:", response);
        const datosCompletos = `
      Usuario creado con éxito !!
      Nombre: ${data.nombre}
      RUT con DV: ${data.rut}
      Email: ${data.email}
      Medicamentos seleccionados: ${selectedMedicamentos.join(", ")}
    `;
        alert(datosCompletos);
        setSelectedMedicamentos([]);
        reset();
        handleClose();
      } catch (error) {
        console.error("Error al enviar datos:", error);
        alert(error.message);
      }
    })(e);
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registro Adicional</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitAndClose}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              {...register("nombre")}
              isInvalid={!!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Rut con DV </Form.Label>
            <Form.Control
              type="text"
              {...register("rut")}
              isInvalid={!!errors.rut}
            />
            <Form.Control.Feedback type="invalid">
              {errors.rut?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Medicamento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar medicamento..."
              onChange={handleSearchChange}
              value={searchTerm}
              className="mb-2"
            />
            <Form.Control
              as="select"
              multiple
              className="select-multiple mb-2"
              value={selectedMedicamentos}
              onChange={handleMedicamentoChange}
              onClick={(e) => e.preventDefault()}
            >
              {filteredMedicamentos.map((medicamento, index) => (
                <option key={index} value={medicamento}>
                  {medicamento}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.medicamentos?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email")}
              isInvalid={!!errors.email}
              className="mb-4"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-center mb-2">
            <Button variant="primary" type="submit">
              Aceptar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalStep2;
