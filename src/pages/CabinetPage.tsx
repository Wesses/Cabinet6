import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import MyTable from "../components/custom-components/MyTable";
import { getPersonalacconts } from "../api/api";
import { PersonalaccontsT } from "@/types";
import { useEffect, useState } from "react";
import TableSkeleton from "@/components/custom-components/TableSkeleton";
import AddInvoiceButton from "@/components/custom-components/AddInvoiceButton";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { onMainPage } from "@/utils/onMainPage";
import { useSearchParams } from "react-router-dom";

const CURRENT_PAGE_PARAM_KEY = "currpage";

const CabinetPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tableData, setTableData] = useState<PersonalaccontsT[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState(-1);
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = Math.floor(
    (window.innerHeight -
      (88 + 20 + 16 + 40 + 1 + 16 + 36 + 40 + 16 + 16 + 50)) /
      57
  );

  const onAlertLogin = () => {
    onMainPage();
  };

  const onAlertQuit = () => {
    window.location.href = "https://www.google.com";
  };

  const getData = (successFunction: () => void = () => {}) => {
    setIsLoading(true);
    setIsError(false);
    getPersonalacconts()
      .then((r) => {
        setTableData(r);
        successFunction();
      })
      .catch((e) => {
        console.log(e);
        setShowAlert(true);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const currentPageParam = Number(searchParams.get(CURRENT_PAGE_PARAM_KEY) ?? 1);
  const handleCurrentPageParam: React.Dispatch<React.SetStateAction<number>> = (value) => {
    if (typeof value === "number") {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(CURRENT_PAGE_PARAM_KEY, value.toString());
      setSearchParams(newParams);
    }
    
    if (typeof value === "function") {
      const newParams = new URLSearchParams(searchParams);
      const newValue = value(currentPageParam);
      newParams.set(CURRENT_PAGE_PARAM_KEY, newValue.toString());
      setSearchParams(newParams);
    }
  }

  useEffect(() => {
    if (!currentPageParam) {
      setSearchParams({[CURRENT_PAGE_PARAM_KEY]: "1"});
    };

    getData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-10 py-5">
        {isLoading && <TableSkeleton />}
        {isError && <h1 className="text-xl">{t("error_message")}</h1>}
        {!isLoading && !tableData.length && !isError && (
          <div className="border-2 border-black shadow-lg w-full h-[200px] rounded-sm flex flex-col justify-center items-center gap-y-8">
            <p className="text-lg">{" " + t("message_add_first_invoice")}</p>
            <div className="flex justify-center items-center w-full">
              <ChevronRightIcon />
              <ChevronRightIcon />
              <ChevronRightIcon />
              <AddInvoiceButton getData={getData} lightInvoice={() => {}} />
              <ChevronLeftIcon />
              <ChevronLeftIcon />
              <ChevronLeftIcon />
            </div>
          </div>
        )}
        {!isLoading && !!tableData.length && !isError && (
          <MyTable
            tableData={tableData}
            getData={getData}
            createdInvoice={createdInvoice}
            setCreatedInvoice={setCreatedInvoice}
            currentPage={currentPageParam}
            setCurrentPage={handleCurrentPageParam}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
      <AlertDialog open={showAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("message_please_login")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("message_need_to_login")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onAlertQuit}>
              {t("leave_website")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={onAlertLogin}>
              {t("button_to_login")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CabinetPage;
