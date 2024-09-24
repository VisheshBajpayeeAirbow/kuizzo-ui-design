import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/dialog";
import Button from "../../Atoms/Button";
import { IDialogProps } from "@/types";
import { LuAlertCircle } from "react-icons/lu";
// reusable  modal
const DefaultDialog = ({
  dialogTitle,
  dialogDescription,
  dialogToggle,
  dialogHandler,
  setDialogToggle,
  buttonOneText,
  buttonTwoText,
}: IDialogProps) => {
  return (
    <>
      <Dialog
        open={dialogToggle}
        onOpenChange={(open) => setDialogToggle(open)}
      >
        <DialogContent>
          <div className="flex justify-center">
            <LuAlertCircle className="text-7xl text-rose-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-lg ">{dialogTitle}</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center gap-4 pt-[1.25rem]">
            <Button
              className="w-auto bg-green-600 hover:scale-105 transition ease-in-out duration-300"
              onClick={() => {
                setDialogToggle(false);
                dialogHandler();
              }}
            >
              {buttonOneText}
            </Button>
            <Button
              className="w-auto border border-app-purple hover:scale-105 transition ease-in-out duration-300"
              onClick={() => setDialogToggle(false)}
              btnColor={"transparent"}
            >
              {buttonTwoText}
            </Button>
          </div>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DefaultDialog;
