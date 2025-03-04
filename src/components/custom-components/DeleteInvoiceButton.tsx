import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, TrashIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  isPopoverOpen: boolean;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  invoiceNum: number;
  deleteInvoice: () => void;
};

const DeleteInvoiceButton = ({
  isPopoverOpen,
  setIsPopoverOpen,
  invoiceNum,
  deleteInvoice,
}: Props) => {

  const handleXPopover = () => setIsPopoverOpen(false);
  const handleChekPopover = () => {
    deleteInvoice();
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="bg-zinc-900 p-2 rounded-lg">
              <TrashIcon className="text-white" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Видалити особовий рахунок</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="flex flex-col items-center px-1 gap-y-2">
        <p>Видалити рахунок під номером <span className="text-orange-600 text-lg">{invoiceNum}</span>?</p>
        <div className="flex justify-evenly w-full h-full">
          <Button className="bg-green-400 hover:bg-green-800" onClick={handleChekPopover}>
            <CheckIcon />
          </Button>
          <Button className="bg-red-400 hover:bg-red-800" onClick={handleXPopover}>
            <XIcon />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteInvoiceButton;
