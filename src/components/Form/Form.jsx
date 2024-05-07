import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Row, Col } from "react-bootstrap";
import { fetchPerfiles } from "../../api";
import ModalStep1 from "../Modal/ModalStep1/ModalStep1";
import ModalStep2 from "../Modal/ModalStep2/ModalStep2";
import Loading from "../Loading/Loading";
const schema = yup
  .object({
    nombre_usuario: yup
      .string()
      .required("El nombre de usuario es obligatorio"),
    password: yup
      .string()
      .min(10, "La contraseña debe tener al menos 10 caracteres")
      .required("La contraseña es obligatoria")
      .test(
        "notContainsUsername",
        "La contraseña no debe contener el nombre de usuario",
        function (value) {
          const { nombre_usuario } = this.parent;
          return !value || !nombre_usuario || !value.includes(nombre_usuario);
        }
      ),
    fecha_nacimiento: yup
      .date()
      .transform((value, originalValue) => {
        const parsedDate = new Date(originalValue);
        return isNaN(parsedDate) ? null : parsedDate;
      })
      .nullable()
      .required(
        "La fecha de nacimiento es obligatoria y debe ser una fecha válida"
      ),
    id_perfil: yup
      .number()
      .transform((value, originalValue) => {
        return isNaN(originalValue) ? null : Number(originalValue);
      })
      .nullable()
      .positive("ID de perfil es obligatorio")
      .required("ID de perfil es obligatorio"),
  })
  .required();

function MyForm() {
  const [perfiles, setPerfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [maxDate, setMaxDate] = useState("");
  const [modalStep2Show, setModalStep2Show] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    async function loadPerfiles() {
      try {
        const data = await fetchPerfiles();
        setPerfiles(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    loadPerfiles();
  }, []);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setMaxDate(formattedDate);
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("Formulario enviado con éxito", data);
      setFormData(data);
      setModalShow(true);
    } catch (error) {
      console.error("Error al enviar formulario: ", error);
    }
  };
  //MODAL 1
  const handleModalStep1Close = () => {
    setModalShow(false);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setModalShow(false);
    setModalStep2Show(true);
  };

  const handleModalStep2Close = () => {
    reset();
    setModalStep2Show(false);
  };
  const handleModalStep2Submit = (e) => {
    console.log("Datos adicionales enviados");
    setModalStep2Show(false);
  };
  if (loading) return <Loading />;
  if (error) return <p>Error al cargar los perfiles.</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-center mb-3">
          <Form.Group
            as={Col}
            xs={12}
            md={8}
            lg={6}
            controlId="formNombreUsuario"
          >
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              className="form-control-lg"
              placeholder="Ingresa tu nombre de usuario"
              {...register("nombre_usuario")}
              isInvalid={!!errors.nombre_usuario}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre_usuario?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="justify-content-center mb-3">
          <Form.Group as={Col} xs={12} md={8} lg={6} controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
              className="form-control-lg"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="justify-content-center mb-3">
          <Form.Group
            as={Col}
            xs={12}
            md={8}
            lg={6}
            controlId="formFechaNacimiento"
          >
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              className="form-control-lg"
              type="date"
              {...register("fecha_nacimiento")}
              max={maxDate}
              isInvalid={!!errors.fecha_nacimiento}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fecha_nacimiento?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="justify-content-center mb-3">
          <Form.Group as={Col} xs={12} md={8} lg={6} controlId="formIdPerfil">
            <Form.Label>ID de perfil</Form.Label>
            <Form.Control
              as="select"
              className="form-control-lg"
              {...register("id_perfil")}
              isInvalid={!!errors.id_perfil}
            >
              <option value="">Seleccione un perfil</option>
              {perfiles &&
                perfiles.map((perfil) => (
                  <option key={perfil.id_Perfil} value={perfil.id_Perfil}>
                    {perfil.nombre_perfil}
                  </option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.id_perfil?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="justify-content-center mb-3">
          <Col xs={12} md={8} lg={6}>
            <Button
              variant="primary"
              type="submit"
              className="btn-lg mt-3 w-100"
            >
              Enviar
            </Button>
          </Col>
        </Row>
      </Form>
      <ModalStep1
        show={modalShow}
        handleClose={handleModalStep1Close}
        handleOptionChange={handleOptionChange}
        handleFormSubmit={handleFormSubmit}
        selectedOption={selectedOption}
      />
      <ModalStep2
        show={modalStep2Show}
        handleClose={handleModalStep2Close}
        handleSubmit={handleModalStep2Submit}
        formData={formData}
      />
    </div>
  );
}

export default MyForm;
