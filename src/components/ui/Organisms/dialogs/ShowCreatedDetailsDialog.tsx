import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/dialog";
import Button from "../../Atoms/Button";
import { copyToClipboard } from "@/utils";
import { FaRegCopy } from "react-icons/fa6";
import { ScrollArea } from "../../../custom/scroll-area";
export interface IShowCreatedDetailsDialogProps {
  dialogTitle: string;
  dialogDescription: string;
  dialogToggle: boolean;
  setDialogToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
const ShowCreatedDetailsDialog = ({
  dialogDescription,
  dialogTitle,
  dialogToggle,
  setDialogToggle,
}: IShowCreatedDetailsDialogProps) => {
  return (
    <Dialog open={dialogToggle} onOpenChange={(open) => setDialogToggle(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <ScrollArea className="h-[200px]  rounded-md border p-4">
            {dialogDescription}
          </ScrollArea>
        </DialogDescription>
        <div className="flex justify-center gap-4 pt-[1.25rem]">
          <Button onClick={() => copyToClipboard(dialogDescription)}>
            <FaRegCopy />
          </Button>
          <Button
            className="w-[8rem] border border-app-purple hover:scale-105 transition ease-in-out duration-300"
            onClick={() => {
              setDialogToggle(false);
            }}
            btnColor={"transparent"}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowCreatedDetailsDialog;
