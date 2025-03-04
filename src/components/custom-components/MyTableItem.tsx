import { cn } from "@/lib/utils";
import { useState } from "react";
import { PersonalaccontsT } from "@/types";
import OpenInvoiceButton from "./OpenInvoiceButton";
import DeleteInvoiceButton from "./DeleteInvoiceButton";

type Props = {
  index: number;
  item: PersonalaccontsT;
  createdInvoice: number;
  invoiceNum: number;
  deleteInvoice: ({
    setIsPopoverOpen,
    setIsDeleteProcessing,
    personalaccontsId,
  }: {
    setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeleteProcessing: React.Dispatch<React.SetStateAction<boolean>>;
    personalaccontsId: number;
  }) => void;
};

const MyTableItem = ({
  index,
  item,
  createdInvoice,
  invoiceNum,
  deleteInvoice,
}: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDeleteprocessing, setIsDeleteProcessing] = useState(false);

  return (
    <tr
      className={cn(
        {
          "bg-white": index % 2 === 0,
          "bg-gray-50": index % 2 !== 0,
          "border-4 border-green-400": createdInvoice === item.paLs,
          "border-4 border-orange-400": isPopoverOpen,
          "border-2 border-gray-300": !isPopoverOpen,
          "opacity-50 cursor-wait pointer-events-none": isDeleteprocessing,
        },
        "text-base transition-all duration-200"
      )}
    >
      <td className="px-4 py-2">{invoiceNum}</td>
      <td className="px-4 py-2">{item.paLs}</td>
      <td className="px-4 py-2">{item.fio}</td>
      <td className="px-4 py-2">{item.addres}</td>
      <td className="px-4 py-2 flex gap-4">
        <OpenInvoiceButton paLs={item.paLs} />

        <DeleteInvoiceButton
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
          invoiceNum={invoiceNum}
          deleteInvoice={() =>
            deleteInvoice({
              setIsPopoverOpen,
              setIsDeleteProcessing,
              personalaccontsId: item.personalaccontsId,
            })
          }
        />
      </td>
    </tr>
  );
};

export default MyTableItem;
