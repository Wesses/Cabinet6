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

const CabinetPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<PersonalaccontsT[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const onAlertLogin = () => {
    navigate("/login");
  };

  const onAlertQuit = () => {
    window.location.href = "https://www.google.com";
  };

  const getData = () => {
    setIsLoading(true);

    getPersonalacconts()
      .then(setTableData)
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
          <MyTable tableData={tableData} getData={getData} />
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
