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
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const CabinetPage = () => {
  const navigate = useNavigate();

  const isToken = Cookies.get(import.meta.env.VITE_TOKEN_NAME);

  const onAlertLogin = () => {
    navigate("/login");
  };

  const onAlertQuit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="w-full h-full flex flex-col">
      {isToken && (
        <div className="px-10 py-5">
          <MyTable />
        </div>
      )}

      <AlertDialog open={!isToken}>
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
