import "../css/errorpage.css"; // Importa el archivo de estilos CSS

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>Error 404</h1>
        <p>La página que estás buscando no se ha encontrado.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
