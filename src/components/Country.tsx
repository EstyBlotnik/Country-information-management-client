import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { CountryData } from "../types/countryTypes";
import { fetchCountries, deleteCountry } from "../services/countryService";
import { FaSpinner } from "react-icons/fa";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
export const Country = () => {
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [countryId, setCountryId] = useState<string>("");
  const { data, isLoading, error } = useQuery<CountryData[], Error>({
    queryKey: ["country"],
    queryFn: fetchCountries,
  });
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: () => deleteCountry(countryId),
    onSuccess: (_, id) => {
      queryClient.setQueryData<CountryData[]>(
        ["country"],
        (oldData) => oldData?.filter((country) => country._id !== id) || []
      );
      console.log("Cache updated after deletion");
    },
    onError: (error) => {
      console.error("Error deleting country:", error);
    },
  });
  if (isLoading) return <FaSpinner className="spinner" />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const rows: GridRowsProp =
    data?.map((country) => ({
      id: country._id,
      name: country.name,
      Region: country.region,
      Flag: country.flag,
      Population: country.population,
    })) || [];
  const columns: GridColDef[] = [
    { field: "name", headerName: "name", width: 150 },
    { field: "Region", headerName: "Region", width: 150 },
    { field: "Population", headerName: "Population", width: 150 },
    {
      field: "Flag",
      headerName: "Flag",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Flag"
          style={{ width: "50px", height: "30px" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row.id)}>Edit</button>
          <button onClick={() => handleDeleteConfirmation(params.row.id)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (id: string) => {
    console.log("Editing country with id:", id);
  };

  const handleDeleteConfirmation = (id: string) => {
    setDeleteDialogOpen(true);
    setCountryId(id);
  };

  const handleDelete = (id: string) => {
    console.log("Deleting country with id:", id);
    setDeleteDialogOpen(false);
    deleteMutation.mutate(id); // שולח את ה-id למחיקה
  };

  const handleCancel = () => {
    console.log("delete country was canceld");
  };

  return (
    <div>
      <h1>Countries list:</h1>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the country</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Country deleted successfully</p>
      )}
      <DataGrid rows={rows} columns={columns} />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => {
          handleCancel();
          setDeleteDialogOpen(false);
        }}
        onDelete={() => {
          handleDelete(countryId);
          setDeleteDialogOpen(false);
        }}
        countryId={countryId}
      />
    </div>
  );
};
