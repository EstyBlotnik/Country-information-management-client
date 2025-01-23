import { CountryData } from "../types/countryTypes";
const apiUrl = "http://localhost:4000/countries";

export const fetchCountries = async (): Promise<CountryData[]> => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    console.log("Failed to fetch countries");
    throw new Error("Failed to fetch countries");
  }
  return response.json();
};

export const deleteCountry = async (id: string): Promise<void> => {
    const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      console.log("Failed to delete country");
      throw new Error("Failed to delete country");
    }
    console.log("Country deleted successfully");
    return;
  };
  