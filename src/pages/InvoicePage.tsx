import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { PersonalaccontsT } from '@/types';

const data = {
  services: "string",
  startDate: "2025-04-03T17:04:46.249Z",
  endDate: "2025-04-03T17:04:46.249Z",
  ls: 0,
  fio: "string",
  nRayona: "string",
  nUlitsi: "string",
  nDoma: "string",
  nKorp: "string",
  nKvart: "string",
  addres: "string",
  telefon: "string",
  kolGil: 0,
  ploshadM2: 0,
  ploshadOtopM2: 0,
  email: "string",
  voda: {
    vodaPodacha: 0,
    vodaStoki: 0,
    nVodaTarifa: "string",
    tsenaPodacha: 0,
    tsenaStoki: 0,
    normaPodachaM3: 0,
    normaStokiM3: 0,
    vodaAbSchetchikiKolvo: 0,
    vodomerArray: [
      {
        idx: "string",
        vodaNSchetchika: "string",
        nomPlombi: "string",
        snSchet: "string",
        dataProvSchet: "2025-04-03T17:04:46.249Z",
      },
    ],
    vodaPoliv: 0,
    ploshadPolivaM2: 0,
    nPolivTarifa: "string",
    tsenaPoliv: 0,
    normaPolivM3m2: 0,
    polivSchetchikiKolvo: 0,
    polivVodomerArray: [
      {
        idx: "string",
        vodaNSchetchika: "string",
        nomPlombi: "string",
        snSchet: "string",
        dataProvSchet: "2025-04-03T17:04:46.249Z",
      },
    ],
    vodaDomSchetchikFlag: 0,
    saldoNachVoda: 0,
  },
  vodaAbplPodacha: {
    vodaAbplPodacha: 0,
    abplPodachaTsenaGrn: 0,
    saldoNachVodaAbplPodacha: 0,
    nAbplPodachaTarifa: "string",
  },
  vodaAbplStoki: {
    vodaAbplStoki: 0,
    abplStokiTsenaGrn: 0,
    saldoNachVodaAbplStoki: 0,
    nAbplStokiTarifa: "string",
  },
  kvartplata: {
    kvplata: 0,
    kvplataTbo: 0,
    kvplataOvds: 0,
    kvplataDymovent: 0,
    kvplataVygreb: 0,
    kvplataTekrem: 0,
    kvplataKnizh: 0,
    kvplataUborter: 0,
    kvplataDetploshad: 0,
    kvplataZima: 0,
    kvplataSvetobsh: 0,
    kvplataDeratiz: 0,
    kvplataDezinsec: 0,
    kvplataUborlest: 0,
    kvplataLiftTo: 0,
    kvplataLiftElectro: 0,
    kvplataOvdsDisp: 0,
    kvplataOvdsElectro: 0,
    kvplataOvdsGaz: 0,
    kvplataRemVds: 0,
    kvplataRemAvt: 0,
    kvplataRemElectro: 0,
    kvplataUprav: 0,
    kvplataRezerv: 0,
    saldoNachKvplata: 0,
    nKvplataTarifa: "string",
    tsenaTbo: 0,
    tsenaOvds: 0,
    tsenaDymovent: 0,
    tsenaVygreb: 0,
    tsenaTekrem: 0,
    tsenaKnizh: 0,
    tsenaUborter: 0,
    tsenaDetploshad: 0,
    tsenaZima: 0,
    tsenaSvetobsh: 0,
    tsenaDeratiz: 0,
    tsenaDezinsec: 0,
    tsenaUborlest: 0,
    tsenaLiftTo: 0,
    tsenaLiftElectro: 0,
    tsenaOvdsDisp: 0,
    tsenaOvdsElectro: 0,
    tsenaOvdsGaz: 0,
    tsenaRemVds: 0,
    tsenaRemAvt: 0,
    tsenaRemElectro: 0,
    tsenaUprav: 0,
    tsenaRezerv: 0,
  },
};

const CabinetPage = () => {
  const [abonentCardData, setAbonentCardData] = useState<PersonalaccontsT | null>(null);

  useEffect(() => {
    setAbonentCardData(null)
  }, []);

  console.log(abonentCardData); 

  return (
    <div className="px-5 py-3">
      <Tabs defaultValue="invoice-data" className="w-1/2 min-w-[800px]">
        <TabsList>
          <TabsTrigger value="invoice-data">
            Данні особового рахунку
          </TabsTrigger>
          <TabsTrigger value="voda">Вода</TabsTrigger>
          <TabsTrigger value="vodaAbplPodacha">vodaAbplPodacha</TabsTrigger>
          <TabsTrigger value="vodaAbplStoki">vodaAbplStoki</TabsTrigger>
          <TabsTrigger value="kvartplata">kvartplata</TabsTrigger>
        </TabsList>
        <TabsContent value="invoice-data">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-4">Основні данні</h2>
              <div className="overflow-auto w-full">
                <Table className="min-w-[700px] border border-muted rounded-xl">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base font-semibold">
                        Поле
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Значення
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Послуги</TableCell>
                      <TableCell>{data.services}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Дата початку
                      </TableCell>
                      <TableCell>{data.startDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Дата закінчення
                      </TableCell>
                      <TableCell>{data.endDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ЛС</TableCell>
                      <TableCell>{data.ls}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ПІБ</TableCell>
                      <TableCell>{data.fio}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Район</TableCell>
                      <TableCell>{data.nRayona}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Вулиця</TableCell>
                      <TableCell>{data.nUlitsi}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Дім</TableCell>
                      <TableCell>{data.nDoma}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Корпус</TableCell>
                      <TableCell>{data.nKorp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Квартира</TableCell>
                      <TableCell>{data.nKvart}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Адреса</TableCell>
                      <TableCell>{data.addres}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Телефон</TableCell>
                      <TableCell>{data.telefon}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Кількість мешканців
                      </TableCell>
                      <TableCell>{data.kolGil}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Площа (м²)</TableCell>
                      <TableCell>{data.ploshadM2}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Опалювана площа (м²)
                      </TableCell>
                      <TableCell>{data.ploshadOtopM2}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Електронна пошта
                      </TableCell>
                      <TableCell>{data.email}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="voda">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-4">Данні по воді</h2>
              <div className="overflow-auto w-full">
                <Table className="min-w-[700px] border border-muted rounded-xl">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base font-semibold">
                        Поле
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Значення
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(data.voda).map(([key, value]) => {
                      if (Array.isArray(value)) return null;
                      return (
                        <TableRow key={key}>
                          <TableCell className="font-medium">{key}</TableCell>
                          <TableCell>{value?.toString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Водомеры</h2>
              <div className="overflow-auto w-full">
                <Table className="min-w-[700px] border border-muted rounded-xl">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base font-semibold">
                        Індекс
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Номер лічильника
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Номер пломби
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Серійний номер
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Дата перевірки
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.voda.vodomerArray.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.idx}</TableCell>
                        <TableCell>{item.vodaNSchetchika}</TableCell>
                        <TableCell>{item.nomPlombi}</TableCell>
                        <TableCell>{item.snSchet}</TableCell>
                        <TableCell>
                          {new Date(item.dataProvSchet).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Счетчики полива</h2>
              <div className="overflow-auto w-full">
                <Table className="min-w-[700px] border border-muted rounded-xl">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base font-semibold">
                        Індекс
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Номер лічильника
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Номер пломби
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Серійний номер
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Дата перевірки
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.voda.polivVodomerArray.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.idx}</TableCell>
                        <TableCell>{item.vodaNSchetchika}</TableCell>
                        <TableCell>{item.nomPlombi}</TableCell>
                        <TableCell>{item.snSchet}</TableCell>
                        <TableCell>
                          {new Date(item.dataProvSchet).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vodaAbplPodacha">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-4">
                Данні по vodaAbplPodacha
              </h2>
              <div className="overflow-auto w-full">
                <Table className="min-w-[700px] border border-muted rounded-xl">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base font-semibold">
                        Поле
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Значення
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(data.vodaAbplPodacha).map(
                      ([key, value]) => {
                        if (Array.isArray(value)) return null;
                        return (
                          <TableRow key={key}>
                            <TableCell className="font-medium">{key}</TableCell>
                            <TableCell>{value?.toString()}</TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vodaAbplStoki">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-4">
                Данні по vodaAbplStoki
              </h2>
              <div className="overflow-auto w-full">
                <Table className="min-w-[700px] border border-muted rounded-xl">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base font-semibold">
                        Поле
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Значення
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(data.vodaAbplStoki).map(([key, value]) => {
                      if (Array.isArray(value)) return null;
                      return (
                        <TableRow key={key}>
                          <TableCell className="font-medium">{key}</TableCell>
                          <TableCell>{value?.toString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="kvartplata">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-4">
                Данні по квартплаті
              </h2>
              <div className="overflow-auto w-full">
                <Table className="min-w-[700px] border border-muted rounded-xl">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base font-semibold">
                        Поле
                      </TableHead>
                      <TableHead className="text-base font-semibold">
                        Значення
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(data.kvartplata).map(([key, value]) => {
                      if (Array.isArray(value)) return null;
                      return (
                        <TableRow key={key}>
                          <TableCell className="font-medium">{key}</TableCell>
                          <TableCell>{value?.toString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CabinetPage;
