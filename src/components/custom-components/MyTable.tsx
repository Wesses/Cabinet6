import { useEffect, useState } from 'react';
import { getPersonalacconts } from '../../api/api';

function MyTable() {
  const [tableData, setTableData] = useState();

  useEffect(() => {
    getPersonalacconts().then(setTableData);
  }, []);

  return (
    <div>{JSON.stringify(tableData)}</div>
  )
}

export default MyTable