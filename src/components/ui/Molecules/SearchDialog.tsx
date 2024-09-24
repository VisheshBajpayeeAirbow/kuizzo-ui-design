import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/dialog";
import { IoSearchOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import FormInput from "../Atoms/form/input/FormInput";
import { useEffect } from "react";
import { ISearchInput } from "@/types";

const SearchDialog = () => {
  const { handleSubmit, register, reset, watch } = useForm<ISearchInput>();

  const watchSearchField = watch("search");

  const onSubmit = (data: ISearchInput) => {
    console.log("SEARCH DATA: ", data);
    reset({ search: "" });
  };

  useEffect(() => {
    console.log("SEARCH FIELD: ", watchSearchField);
  }, [watchSearchField]);

  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger>
          <IoSearchOutline className="text-xl" />
        </DialogTrigger>
        <DialogContent className="rounded-[1.69rem] border-card-border">
          <DialogHeader>
            <DialogTitle className="font-caladea text-heading">
              Search Kuizzo
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                name="search"
                register={register}
                inputType="withIcon"
                placeholder="Search Kuizzo"
                Icon={IoSearchOutline}
              />
            </form>
          </DialogHeader>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
