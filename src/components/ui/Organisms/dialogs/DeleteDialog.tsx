import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/dialog";
import Button from "../../Atoms/Button";
import { IDialogProps } from "@/types";

// reusable delete modal
const DeleteDialog = ({
  dialogTitle,
  dialogDescription,
  dialogToggle,
  dialogHandler,
  setDialogToggle,
}: IDialogProps) => {
  return (
    <>
      <Dialog
        open={dialogToggle}
        onOpenChange={(open) => setDialogToggle(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center gap-4 pt-[1.25rem]">
            <Button
              className="w-[8rem] bg-rose-600 hover:scale-105 transition ease-in-out duration-300"
              onClick={() => {
                setDialogToggle(false);
                dialogHandler();
              }}
            >
              Delete
            </Button>
            <Button
              className="w-[8rem] border border-app-purple hover:scale-105 transition ease-in-out duration-300"
              onClick={() => setDialogToggle(false)}
              btnColor={"transparent"}
            >
              Cancel
            </Button>
          </div>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
