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
import { useNavigate } from "react-router";
import { getPersonalacconts } from "../api/api";
import { PersonalaccontsT } from "@/types";
import { useEffect, useState } from "react";
import TableSkeleton from "@/components/custom-components/TableSkeleton";
import { localStorages } from "@/utils/constants";
import Cookies from "js-cookie";

const CabinetPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<PersonalaccontsT[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const onAlertLogin = () => {
    Cookies.remove(import.meta.env.VITE_TOKEN_NAME, {
      path: import.meta.env.VITE_BASE_URL,
    });
    navigate("/login");
    localStorage.removeItem(localStorages.USER_DATA);
  };

  const onAlertQuit = () => {
    window.location.href = "https://www.google.com";
  };

  const getData = (successFunction: () => void = () => {}) => {
    setIsLoading(true);
    getPersonalacconts()
      .then((r) => {
        setTableData(r);
        successFunction();
      })
      .catch((e) => {
        console.log(e);
        setShowAlert(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-10 py-5">
        {isLoading || !tableData.length ? (
          <TableSkeleton />
        ) : (
          <MyTable
            tableData={tableData}
            getData={getData}
            createdInvoice={createdInvoice}
            setCreatedInvoice={setCreatedInvoice}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      <AlertDialog open={showAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Будь ласка залогінтесь</AlertDialogTitle>
            <AlertDialogDescription>
              Необхідно залогінитись, щоб передивлятись інформацію про рахунки.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onAlertQuit}>
              Залишити сайт
            </AlertDialogCancel>
            <AlertDialogAction onClick={onAlertLogin}>
              Залогінитись
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CabinetPage;
