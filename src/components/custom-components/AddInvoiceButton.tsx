import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { PlusIcon } from 'lucide-react'
import CabinetAddInvoiceForm from './CabinetAddInvoiceForm'
import { useTranslation } from 'react-i18next'

type Props = {
  getData: (successFunction: () => void) => void;
  lightInvoice: (invoice: number) => void;
}

const AddInvoiceButton = ({getData, lightInvoice}: Props) => {
  const {t} = useTranslation();

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="bg-zinc-900 p-2 rounded-lg">
              <PlusIcon className="text-white" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("button_add_invoice")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </AlertDialogTrigger>
    <CabinetAddInvoiceForm
      getData={getData}
      lightInvoice={lightInvoice}
    />
  </AlertDialog>
  )
}

export default AddInvoiceButton