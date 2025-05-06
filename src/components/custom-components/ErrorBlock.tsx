import { Button } from '../ui/button';
import { onMainPage } from "@/utils/onMainPage";

function ErrorBlock() {
  return (
    <div className="flex flex-col gap-1 justify-center items-center w-full h-full">
      <h1>Сталася попилка оновіть сторінку</h1>
      <div className="flex flex-row gap-2">
        <Button onClick={() => window.location.reload()}>Оновити</Button>
        <Button onClick={onMainPage}>На головну</Button>
      </div>
    </div>
  );
}

export default ErrorBlock;
