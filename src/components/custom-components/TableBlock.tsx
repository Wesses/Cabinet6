import { PersonalaccontsT } from "@/types";
import OpenInvoiceButton from "./OpenInvoiceButton";
import DeleteInvoiceButton from "./DeleteInvoiceButton";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  item: PersonalaccontsT;
  invoiceNum: number;
  index: number;
  createdInvoice: number;
  deleteInvoice: ({ setIsPopoverOpen, setIsDeleteProcessing, personalaccontsId }: {
    setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsDeleteProcessing: React.Dispatch<React.SetStateAction<boolean>>,
    personalaccontsId: number,
}) => void
};

const TableBlock = ({ item, invoiceNum, index, createdInvoice, deleteInvoice }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDeleteprocessing, setIsDeleteProcessing] = useState(false);


  return (
    <div
      className={cn(
        {
          "bg-white": index % 2 === 0,
          "bg-gray-50": index % 2 !== 0,
          "border-2 border-zinc-900": !isPopoverOpen,
          "border-4 border-green-400": createdInvoice === item.paLs,
          "border-4 border-orange-400": isPopoverOpen,
          "opacity-50 cursor-wait pointer-events-none": isDeleteprocessing,
        },
        "rounded-lg p-2 transition-all duration-200"
      )}
    >
      <div className="flex gap-x-4">
        <OpenInvoiceButton paLs={item.paLs} />

        <DeleteInvoiceButton
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
          invoiceNum={invoiceNum}
          deleteInvoice={() => deleteInvoice({setIsPopoverOpen, setIsDeleteProcessing, personalaccontsId: item.personalaccontsId})}
        />
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
