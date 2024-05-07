import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
