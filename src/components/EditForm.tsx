import { Formik, Form, Field, FieldProps } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useCountries } from "../hooks/useCountries";
import "../style/editFile.scss";
import { useParams } from "react-router-dom";
import { CountryData } from "../types/countryTypes";
import VerificationDialog from "./VerificationDialogue";
const CountryScema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too Short!")
    .max(50, "Name is too Long!")
    .required("Name is equired"),
  flag: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^https:\/\//, "must start with 'https://'"),
  population: Yup.number()
    .positive("Population must be positive")
    .integer("Population must be an integer")
    .required("Population is required"),
  region: Yup.string()
    .min(3, "Region is too Short!")
    .max(50, "Region is too Long!")
    .required("Region is required"),
});

export const ValidationCountryData = () => {
  const { updateCountry, getCountryById, addCountry } = useCountries();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [country, setCountry] = useState<CountryData | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log("id:", id);
  useEffect(() => {
    if (id) {
      const fetchedCountry = getCountryById(id);
      if (fetchedCountry) {
        setCountry(fetchedCountry);
      }
    }
    console.log("country:", country);
  }, [id, getCountryById, navigate]);

  const handleCancelEdit = (): void => {
    console.log("Cancel edit action triggered.");
    navigate("/"); // נווט לעמוד הבית
  };
  const handleCancelConfirmation = () => {
    setCancelDialogOpen(true);
  };

  return (
    <div className="form-container">
      <h1>{country ? "Edit Country" : "Add Country"}</h1>
      <Formik
        key={country ? country._id : "new"}
        initialValues={{
          name: country ? country.name : "",
          flag: country ? country.flag : "",
          population: country ? country.population : 0,
          region: country ? country.region : "",
        }}
        validationSchema={CountryScema}
        onSubmit={(values) => {
          const countryId = country ? country._id : "0";
          if (country) {
            updateCountry({
              countryId,
              updatedData: { ...values, _id: countryId },
            });
            
          } else {
            addCountry(values);
          }

          console.log("submitted: ", values);
          navigate("/");
        }}
      >
        {({ errors, touched, dirty, isValid }) => (
          <Form>
            <Field name="name">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Country Name"
                  error={meta.touched && Boolean(meta.error)} // הצגת שגיאה אם יש
                  helperText={meta.touched && meta.error} // טקסט עזר לשגיאה
                />
              )}
            </Field>
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <Field name="flag">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Flag URL"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            {errors.flag && touched.flag ? <div>{errors.flag}</div> : null}

            <Field name="population" type="number">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Population"
                  type="number"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            {errors.population && touched.population ? (
              <div>{errors.population}</div>
            ) : null}

            <Field name="region">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Region"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            {errors.region && touched.region ? (
              <div>{errors.region}</div>
            ) : null}
            <div className="buttons-container">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!dirty || !isValid}
                className="btn ok-button"
              >
                OK
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCancelConfirmation}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <VerificationDialog
        dialogFor= {country? "edit" : "add"  }
        open={cancelDialogOpen}
        onClose={() => {
          setCancelDialogOpen(false);
        }}
        onCancele={handleCancelEdit}
      />
    </div>
  );
};
