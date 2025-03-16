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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const handleXPopover = () => setIsPopoverOpen(false);
  const handleChekPopover = () => {
    deleteInvoice();
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="bg-zinc-900 p-2 rounded-lg">
                <TrashIcon className="text-white" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("button_delete_invoice")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="flex flex-col items-center px-4 gap-y-2 w-full"
      >
        <p className="sm:text-xl text-base">
          {t("button_delete_invoice_2") + " "}
          <span className="text-orange-600 sm:text-2xl text-lg">
            {invoiceNum}
          </span>
          ?
        </p>
        <div className="flex justify-evenly w-full h-full">
          <Button
            className="bg-green-400 hover:bg-green-800"
            onClick={handleChekPopover}
          >
            <CheckIcon className="sm:size-8 size-5" />
          </Button>
          <Button
            className="bg-red-400 hover:bg-red-800"
            onClick={handleXPopover}
          >
            <XIcon className="sm:size-8 size-5" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteInvoiceButton;
