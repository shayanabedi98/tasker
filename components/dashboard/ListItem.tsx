import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  name: string;
  isLoading: boolean;
  id: string;
  clickedListName: string;
  handleDeleteList: (name: string, id: string) => void;
  handleIsEdit: (name: string) => void;
};

export default function ListItem({
  name,
  id,
  clickedListName,
  handleDeleteList,
  handleIsEdit,
  isLoading,
}: Props) {
  return (
    <div className="relative flex h-48 w-48 items-center justify-center rounded-md border-2 border-secondary bg-primary p-1 text-center transition lg:hover:scale-105">
      <p className="cursor-pointer text-2xl font-semibold">
        {isLoading && clickedListName == name ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <span className="lg:hover:underline">{name}</span>
        )}
      </p>
      <div className="absolute right-1 top-1 flex gap-2 text-2xl">
        <MdEdit
          className="cursor-pointer rounded-sm bg-bgLight p-1"
          onClick={() => handleIsEdit(name)}
        />
        <IoMdTrash
          className="cursor-pointer rounded-sm bg-bgLight p-1"
          onClick={() => handleDeleteList(id, name)}
        />
      </div>
    </div>
  );
}
