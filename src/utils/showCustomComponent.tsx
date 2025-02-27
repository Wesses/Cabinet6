import { XIcon } from 'lucide-react';
import { toast } from "sonner";

export const showCustomToast = (message: string, bgColor: string) => {
  toast.custom((id) => (
    <div
      className={`w-[320px] ${bgColor} p-3 text-white text-base flex justify-between items-center shadow-lg rounded-md`}
    >
      <p>{message}</p>
      <button
        onClick={() => toast.dismiss(id)}
        className="ml-2 text-white text-xl font-bold"
      >
        <XIcon className="size-10"/>
      </button>
    </div>
  ));
};