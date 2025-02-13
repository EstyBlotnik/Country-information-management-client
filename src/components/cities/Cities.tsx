import { FaPlus, FaCity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useCities } from "../../hooks/useCities";
import "../../style/Country.scss";

export const Cities = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { cities, isLoading, error } = useCities();

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error instanceof Error)
    return <div className="error">{error.message}</div>;

  return (
    <div className="cities-container">
      <h1 className="title">All cities</h1>
      <div className="cities-grid">
        {cities?.map((city) => (
          <div key={city._id} className="city-card">
            <FaCity className="city-icon" />
            <h3 className="city-name">{city.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
