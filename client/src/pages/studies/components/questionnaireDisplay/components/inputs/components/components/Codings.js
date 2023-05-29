import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function ({ input, close }) {
  return (
    <Dialog open={true}>
      <DialogTitle>{input.name}</DialogTitle>
      <DialogContent>
        <DialogTitle>Codings</DialogTitle>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()}>close</Button>
      </DialogActions>
    </Dialog>
  );
}
