import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { PlusIcon } from 'lucide-react'
import CabinetAddInvoiceForm from './CabinetAddInvoiceForm'

type Props = {
  getData: (successFunction: () => void) => void;
  lightInvoice: (invoice: number) => void;
}

const AddInvoiceButton = ({getData, lightInvoice}: Props) => {
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
              <p>Додати особовий рахунок</p>
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