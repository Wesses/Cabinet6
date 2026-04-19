import { EyeIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useTranslation } from 'react-i18next';

const OpenInvoiceButton = ({id}: {id: number}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenInvoice = (id: number) => {

    navigate(`/cabinet/${id}?tab=invoice-data`);
  };

  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger
        className="bg-primary p-2 rounded-lg"
        onClick={() => handleOpenInvoice(id)}
      >
        <EyeIcon className="text-primary-foreground" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("button_open_invoice")}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}

export default OpenInvoiceButton