import { useEffect, useState } from "react";
import { getPersonalacconts } from "../../api/api";
import { Card, CardContent } from "@/components/ui/card";
import { PersonalaccontsT } from "@/types";
function MyTable() {
  const [tableData, setTableData] = useState<PersonalaccontsT[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const filteredData = tableData.filter(
    (item) =>
      item.fio.toLowerCase().includes(searchQuery.toLowerCase()) &&
      item.addres.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    getPersonalacconts().then(setTableData).catch();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="shadow-xl border border-gray-300 rounded-lg">
    <CardContent className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Пошук за ПІБ або адресою"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 border-b border-gray-300 text-left">#</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Рахунок</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">ПІБ</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Район</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Вулиця</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Будинок</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Корпус</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Квартира</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Адреса</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={item.personalaccontsId}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2 border-b border-gray-300">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.paLs}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.fio}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.nRayona}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.nUlitsi}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.nDoma}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.nKorp}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.nKvart}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.addres}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    </CardContent>
  </Card>
  );
}

export default MyTable;
