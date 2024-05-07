import MyForm from "../../components/Form/Form";
import styles from "./HomePage.module.scss";
const HomePage = () => {
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Registro de Usuario</h1>
      <div className={styles.form}>
        <MyForm />
      </div>
    </div>
  );
};

export default HomePage;
