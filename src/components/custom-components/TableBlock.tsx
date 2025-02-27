import { EyeIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { PersonalaccontsT } from "@/types";
import { useNavigate } from "react-router";

const TableBlock = ({ item }: { item: PersonalaccontsT }) => {
  const navigate = useNavigate();

  const handleOpenInvoice = (id: number) => {
    navigate(`/cabinet/${id}`);
  };

  return (
    <div className="border border-zinc-900 rounded-lg p-2">
      <div className="flex gap-x-4">
        <Button onClick={() => handleOpenInvoice(item.paLs)}>
          <EyeIcon className="text-white" />
        </Button>

        <Button>
          <TrashIcon className="text-white" />
        </Button>
      </div>
      <div className="flex gap-x-8 pt-4">
        <ul className="font-semibold sm:text-base text-xs">
          <li>#: </li>
          <li className="sm:block hidden">Особовий рахунок: </li>
          <li className="block sm:hidden">Рахунок: </li>
          <li>ПІБ: </li>
          <li>Адреса: </li>
        </ul>
        <ul className="sm:text-base text-xs">
          <li>{item.personalaccontsId - 1}</li>
          <li>{item.paLs}</li>
          <li>{item.fio}</li>
          <li>{item.addres}</li>
        </ul>
      </div>
    </div>
  );
};

export default TableBlock;
