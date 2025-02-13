import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface CancelDialogProps {
  dialogFor: "edit" | "delete" | "add";
  open: boolean;
  onClose: () => void;
  onCancele?: () => void;
  onDelete?: (id: string) => void;
  countryId?: string;
}

const VerificationDialog: React.FC<CancelDialogProps> = ({
  dialogFor,
  open,
  onClose,
  onCancele = () => {},
  onDelete = () => {},
  countryId = "",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <p>
          Do you really want to
          {dialogFor === "delete"
            ? " delete "
            : ` cancel ${dialogFor === "edit" ? "editing" : "adding"} `}
          this country?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button
          onClick={() => {
            if (dialogFor === "delete") {
              onDelete(countryId);
            } else {
              onCancele();
            }
          }}
          color="secondary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerificationDialog;
