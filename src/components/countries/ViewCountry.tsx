import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import "../../style/editFile.scss";
import "../../style/Country.scss";
import { useCountries } from "../../hooks/useCountries";
import { CountryData } from "../../types/countryTypes";
import { useUser } from "../../hooks/useUser";

export const ViewCountry = () => {
  const { id } = useParams<{ id: string }>();
  const { getCountryById } = useCountries();
  const { user } = useUser();
  const navigate = useNavigate();
  const [country, setCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    const selectedCountry = getCountryById(id || "0");
    if (!selectedCountry) {
      navigate("/countries");
    } else {
      setCountry(selectedCountry);
    }
  }, [id, navigate]);

  if (!country) return <div>No country found</div>;
  const handleEdit = () => {
    navigate(`/editCountry/${country._id}`);
  };
  const handleBack = () => {
    navigate("/countries");
  };

  return (
    <Card className="country-card">
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {country.name}
        </Typography>
        <img src={country.flag} alt={`${country.name} Flag`} className="flag" />
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">
          Population: {country.population}
        </Typography>
        <Typography variant="body1">Region: {country.region}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Cities:</Typography>
        <List>
          {country.cities && country.cities.length > 0 ? (
            country.cities.map((city, index) => (
              <ListItem key={index}>
                <ListItemText primary={city.name} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2">No cities available</Typography>
          )}
        </List>
        <button className="button button-delete" onClick={() => handleBack()}>
            Back
          </button>
        {user && ["Admin", "Delete", "Add", "Edit"].includes(user.role) && (
          <button className="button button-edit" onClick={() => handleEdit()}>
            Edit
          </button>
        )}
      </CardContent>
    </Card>
  );
};
