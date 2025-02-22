import { useParams } from "react-router-dom";

const CabinetPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Cabinet Page</h1>
      {id && <p>Cabinet ID: {id}</p>}
    </div>
  );
};

export default CabinetPage;
