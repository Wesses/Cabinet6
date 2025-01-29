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
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import MyTable from './MyTable';

const NewCabinet = () => {
  const navigate = useNavigate();

  const isToken = !!Cookies.get(import.meta.env.VITE_TOKEN_NAME);

  const onAlertLogin = () => {
    navigate("/login");
  };

  const onAlertQuit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <>
      {isToken && (<div>
        <MyTable />
        </div>)}

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
    </>
  );
};

export default NewCabinet;
