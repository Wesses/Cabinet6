import { useEffect, useState } from "react";
import { getPersonalacconts } from "../../api/api";
import { Card, CardContent } from "@/components/ui/card";
import { PersonalaccontsT } from "@/types";
import { useNavigate } from "react-router";
import { EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TableSkeleton from "./TableSkeleton";
import TableBlock from "./TableBlock";

function MyTable() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<PersonalaccontsT[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const filteredData = tableData.filter(
    (item) =>
      item.fio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.paLs.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setIsLoading(true);
    getPersonalacconts()
      .then(setTableData)
      .catch(() => {
        navigate("/login");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenInvoice = (id: number) => {
    navigate(`/cabinet/${id}`);
  };

  return (
    <Card className="shadow-xl border border-gray-300 rounded-lg">
      <CardContent className="p-4">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <div className="mb-4 flex gap-x-4">
              <input
                type="text"
                placeholder="Пошук за ПІБ або адресою"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded w-full"
              />

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
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-2 border-b border-gray-300">
                        {item.personalaccontsId - 1}
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

            {totalPages > 10 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Попередня
                </button>
                <span className="text-sm">
                  Сторінка {currentPage} з {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Наступна
                </button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default MyTable;
