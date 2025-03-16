import { EyeIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useTranslation } from 'react-i18next';

const OpenInvoiceButton = ({paLs}: {paLs: number}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenInvoice = (id: number) => {
    navigate(`/cabinet/${id}`);
  };

  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger
        className="bg-zinc-900 p-2 rounded-lg"
        onClick={() => handleOpenInvoice(paLs)}
      >
        <EyeIcon className="text-white" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("button_open_invoice")}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}

export default OpenInvoiceButton