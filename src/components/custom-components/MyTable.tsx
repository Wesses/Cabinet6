import { useEffect, useState } from "react";
import { getPersonalacconts } from "../../api/api";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PersonalaccontsT } from "@/types";
import { useNavigate } from "react-router";
import {
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import TableSkeleton from "./TableSkeleton";
import TableBlock from "./TableBlock";
import { Input } from "../ui/input";
import CabinetAddInvoiceForm from "./CabinetAddInvoiceForm";
import { cn } from "@/lib/utils";

function MyTable() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<PersonalaccontsT[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState(-1);
  const itemsPerPage = 7;

  const filteredData = tableData.filter((item) => {
    const splitedFio = item.fio.toLowerCase().trim().split(" ");
    const validInput = searchQuery.toLowerCase().trim();
    const validPaLs = item.paLs.toString().toLowerCase();

    return (
      splitedFio.some((str) => str.startsWith(validInput)) ||
      validPaLs.startsWith(validInput)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getData = () => {
    setIsLoading(true);
    getPersonalacconts()
      .then(setTableData)
      .catch(() => {
        navigate("/login");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenInvoice = (id: number) => {
    navigate(`/cabinet/${id}`);
  };

  const lightInvoice = (invoice: number) => {
    setCurrentPage(Math.ceil(filteredData.length / itemsPerPage));
    setCreatedInvoice(invoice);
  };

  return (
    <Card className="shadow-xl border border-gray-300 rounded-lg">
      <CardContent className="p-4">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <div className="mb-4 flex gap-x-4">
              <SearchIcon className="size-10" />

              <Input
                type="text"
                placeholder="Пошук за рахунком або ПІБ"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded w-full text-base"
              />

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
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="table-auto w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-2 border-b border-gray-300 text-left">
                      #
                    </th>
                    <th className="px-4 py-2 border-b border-gray-300 text-left">
                      Особовий рахунок
                    </th>
                    <th className="px-4 py-2 border-b border-gray-300 text-left">
                      ПІБ
                    </th>
                    <th className="px-4 py-2 border-b border-gray-300 text-left">
                      Адреса
                    </th>
                    <th className="px-4 py-2 border-b border-gray-300 text-left"></th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr
                      key={item.personalaccontsId}
                      className={cn({
                        "bg-white": index % 2 === 0,
                        "bg-gray-50": index % 2 !== 0,
                        "border-4 border-green-600":
                          createdInvoice === item.paLs,
                      })}
                    >
                      <td className="px-4 py-2 border-b border-gray-300">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        {item.paLs}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        {item.fio}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        {item.addres}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 flex gap-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger
                              className="bg-zinc-900 p-2 rounded-lg"
                              onClick={() => handleOpenInvoice(item.paLs)}
                            >
                              <EyeIcon className="text-white" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Подивитися особовий рахунок</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="bg-zinc-900 p-2 rounded-lg">
                              <TrashIcon className="text-white" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Видалити особовий рахунок</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden flex flex-col gap-y-4">
              {paginatedData.map((item) => (
                <TableBlock item={item} key={item.personalaccontsId} />
              ))}
            </div>

            {filteredData.length > itemsPerPage && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 md:block hidden"
                >
                  Попередня
                </button>

                <div className="block md:hidden cursor-pointer h-16 w-16">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="text-black disabled:opacity-50 w-full h-full flex justify-center items-center"
                  >
                    <ChevronsLeftIcon className="size-8" />
                  </button>
                </div>

                <span className="text-sm">
                  Сторінка {currentPage} з {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="md:block hidden px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Наступна
                </button>

                <div className="block md:hidden cursor-pointer h-16 w-16">
                  <button
                    className="text-black disabled:opacity-50 w-full h-full flex justify-center items-center"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRightIcon className="size-8" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default MyTable;
