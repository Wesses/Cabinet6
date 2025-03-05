import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronsLeftIcon,
  ChevronsRightIcon,
  SearchIcon,
} from "lucide-react";
import TableBlock from "./TableBlock";
import { Input } from "../ui/input";
import { PersonalaccontsT } from "@/types";
import MyTableItem from "./MyTableItem";
import { deletePersonalaccont } from "@/api/api";
import { showCustomToast } from "@/utils/showCustomComponent";
import AddInvoiceButton from './AddInvoiceButton';

const getInvoiceNumber = (
  currentPage: number,
  itemsPerPage: number,
  index: number
) => (currentPage - 1) * itemsPerPage + index + 1;

type Props = {
  getData: (successFunction: () => void) => void;
  tableData: PersonalaccontsT[];
  createdInvoice: number;
  setCreatedInvoice: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
};

function MyTable({
  getData,
  tableData,
  createdInvoice,
  setCreatedInvoice,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = tableData.filter((item) => {
    const splitedFio = item.fio.toLowerCase().trim().split(" ");
    const validInput = searchQuery.toLowerCase().trim();
    const validPaLs = item.paLs.toString().toLowerCase();

    return (
      splitedFio.some((str) => str.startsWith(validInput)) ||
      validPaLs.startsWith(validInput) ||
      item.fio.toLowerCase().trim().startsWith(validInput)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const lightInvoice = (invoice: number) => {
    if (filteredData.length % itemsPerPage === 0) {
      setCurrentPage(totalPages + 1);
    } else {
      setCurrentPage(totalPages);
    }
    setCreatedInvoice(invoice);
  };

  const deleteInvoice = ({
    setIsPopoverOpen,
    setIsDeleteProcessing,
    personalaccontsId,
  }: {
    setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeleteProcessing: React.Dispatch<React.SetStateAction<boolean>>;
    personalaccontsId: number;
  }) => {
    setIsPopoverOpen(false);
    setIsDeleteProcessing(true);

    (async () => {
      try {
        await deletePersonalaccont(personalaccontsId);
        getData(() => {
          if (!paginatedData.length) {
            setCurrentPage((prev) => prev--);
          }
        });
        showCustomToast("Успішно видалено", "bg-green-400");
      } catch (e) {
        console.error(e);
        showCustomToast("Сталася помилка. Спробуйте пізніше", "bg-red-400");
      } finally {
        setIsDeleteProcessing(false);
      }
    })();
  };

  useEffect(() => {
    if (searchQuery) setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage]);

  return (
    <Card className="shadow-xl border border-gray-300 rounded-lg">
      <CardContent className="p-4">
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

              <AddInvoiceButton
                getData={getData}
                lightInvoice={lightInvoice}
              />
          </div>

        {filteredData.length ? (
                    <div>
            <div className="hidden md:block overflow-x-auto">
              <table className="table-auto w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-2 border-b border-gray-300 text-left">
                      #
                    </th>
                    <th className="px-4 py-2 border-b border-gray-300 text-right">
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
                    <MyTableItem
                      key={item.personalaccontsId}
                      index={index}
                      item={item}
                      createdInvoice={createdInvoice}
                      invoiceNum={getInvoiceNumber(
                        currentPage,
                        itemsPerPage,
                        index
                      )}
                      deleteInvoice={deleteInvoice}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden flex flex-col gap-y-4">
              {paginatedData.map((item, index) => (
                <TableBlock
                  item={item}
                  key={item.personalaccontsId}
                  invoiceNum={getInvoiceNumber(
                    currentPage,
                    itemsPerPage,
                    index
                  )}
                  createdInvoice={createdInvoice}
                  index={index}
                  deleteInvoice={deleteInvoice}
                />
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
          </div>
        ) : (
          <h1 className="text-xl">Не знайдено жодного собового рахунку, перевірте правильність вводу та спройте ще раз.</h1>
        )}
        </>
      </CardContent>
    </Card>
  );
}

export default MyTable;
