import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { PlusIcon } from 'lucide-react'
import CabinetAddInvoiceForm from './CabinetAddInvoiceForm'
import { useTranslation } from 'react-i18next'
import { OrganizationDataT } from '@/types'

type Props = {
  getData: (successFunction: () => void) => void;
  lightInvoice: (invoice: number) => void;
  orgData?: OrganizationDataT | null;
}

const AddInvoiceButton = ({getData, lightInvoice, orgData}: Props) => {
  const {t} = useTranslation();

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="p-2 rounded-lg bg-primary">
              <PlusIcon className="text-primary-foreground" />
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
      orgData={orgData}
    />
  </AlertDialog>
  )
}

export default AddInvoiceButton;