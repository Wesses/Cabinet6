export interface NewsT {
  newsId: number;
  deleted: boolean;
  userChg: string;
  dateChg: string;
  organizationId: number;
  newsDate: string;
  newsText: string;
  organization: string | null;
}

export interface OrganizationDataT {
  name: string;
  description: string;
  contactAddress: string;
  contactPhone: string;
}

export interface PersonalaccontsT {
  personalaccontsId: number;
  paLs: number;
  fio: string;
  nRayona: string;
  nUlitsi: string;
  nDoma: string;
  nKorp: string;
  nKvart: string;
  addres: string;
  pwd: string;
  organizationAlias: string;
}

export interface KvartplataT {
  kvplata: number;
  kvplataTbo: number;
  kvplataOvds: number;
  kvplataDymovent: number;
  kvplataVygreb: number;
  kvplataTekrem: number;
  kvplataKnizh: number;
  kvplataUborter: number;
  kvplataDetploshad: number;
  kvplataZima: number;
  kvplataSvetobsh: number;
  kvplataDeratiz: number;
  kvplataDezinsec: number;
  kvplataUborlest: number;
  kvplataLiftTo: number;
  kvplataLiftElectro: number;
  kvplataOvdsDisp: number;
  kvplataOvdsElectro: number;
  kvplataOvdsGaz: number;
  kvplataRemVds: number;
  kvplataRemAvt: number;
  kvplataRemElectro: number;
  kvplataUprav: number;
  kvplataRezerv: number;
  saldoNachKvplata: number;
  nKvplataTarifa: string;
  tsenaTbo: number;
  tsenaOvds: number;
  tsenaDymovent: number;
  tsenaVygreb: number;
  tsenaTekrem: number;
  tsenaKnizh: number;
  tsenaUborter: number;
  tsenaDetploshad: number;
  tsenaZima: number;
  tsenaSvetobsh: number;
  tsenaDeratiz: number;
  tsenaDezinsec: number;
  tsenaUborlest: number;
  tsenaLiftTo: number;
  tsenaLiftElectro: number;
  tsenaOvdsDisp: number;
  tsenaOvdsElectro: number;
  tsenaOvdsGaz: number;
  tsenaRemVds: number;
  tsenaRemAvt: number;
  tsenaRemElectro: number;
  tsenaUprav: number;
  tsenaRezerv: number;
}

export interface getAbonentCardT {
  services: string;
  startDate: Date;
  endDate: Date;
  ls: number;
  fio: string;
  nRayona: string;
  nUlitsi: string;
  nDoma: string;
  nKorp: string;
  nKvart: string;
  addres: string;
  telefon: string;
  kolGil: number;
  ploshadM2: number;
  ploshadOtopM2: number;
  email: string;
  voda: {
    vodaPodacha: number;
    vodaStoki: number;
    nVodaTarifa: string;
    tsenaPodacha: number;
    tsenaStoki: number;
    normaPodachaM3: number;
    normaStokiM3: number;
    vodaAbSchetchikiKolvo: number;
    vodomerArray: [
      {
        idx: string;
        vodaNSchetchika: string;
        nomPlombi: string;
        snSchet: string;
        dataProvSchet: Date;
      }
    ];
    vodaPoliv: number;
    ploshadPolivaM2: number;
    nPolivTarifa: string;
    tsenaPoliv: number;
    normaPolivM3m2: number;
    polivSchetchikiKolvo: number;
    polivVodomerArray: [
      {
        idx: string;
        vodaNSchetchika: string;
        nomPlombi: string;
        snSchet: string;
        dataProvSchet: Date;
      }
    ];
    vodaDomSchetchikFlag: number;
    saldoNachVoda: number;
  };
  vodaAbplPodacha: {
    vodaAbplPodacha: number;
    abplPodachaTsenaGrn: number;
    saldoNachVodaAbplPodacha: number;
    nAbplPodachaTarifa: string;
  };
  vodaAbplStoki: {
    vodaAbplStoki: number;
    abplStokiTsenaGrn: number;
    saldoNachVodaAbplStoki: number;
    nAbplStokiTarifa: string;
  };
  kvartplata: KvartplataT;
};

export type AbonentInvoiceInfoT = Partial<
  Pick<
    getAbonentCardT,
    "ls" | "fio" | "addres" | "telefon" | "email" | "kolGil" | "ploshadM2"
  >
>;

export type WaterSupplyDataT = Partial<
  Pick<
    getAbonentCardT["voda"],
    | "vodaPodacha"
    | "tsenaPodacha"
    | "vodaAbSchetchikiKolvo"
    | "vodaStoki"
    | "tsenaStoki"
    | "vodaPoliv"
    | "ploshadPolivaM2"
    | "tsenaPoliv"
    | "polivSchetchikiKolvo"
  >
>;

export type VodaAbplPodachaDataT = Partial<
  Pick<
    getAbonentCardT["vodaAbplPodacha"],
    | "vodaAbplPodacha"
    | "abplPodachaTsenaGrn"
    | "saldoNachVodaAbplPodacha"
    | "nAbplPodachaTarifa"
  >
>;

export type VodaAbplStokiDataT = Partial<
  Pick<
    getAbonentCardT["vodaAbplStoki"],
    | "vodaAbplStoki"
    | "abplStokiTsenaGrn"
    | "saldoNachVodaAbplStoki"
    | "nAbplStokiTarifa"
  >
>;

export enum TabsNamesT {
  Invoice_data = "invoice-data",
  Water_supply = "water-supply",
  Water_supply_fee = "water-supply-fee",
  Water_supply_drainage = "water-supply-drainage",
  Rent_data = "rent-data",
};

export interface ArchiveItemT {
  idx: number;
  mes: string;
  data: Date;
  startDate: Date;
  endDate: Date;
  errorCode: number;
  errorMsg: string;

  saldoNVoda: number;
  saldoNVyvozOthodov: number;
  saldoNKvplata: number;
  saldoNOtop: number;
  saldoNElectro: number;
  saldoNGaz: number;
  saldoNGvs: number;
  saldoNParking: number;
  saldoNOharna: number;
  saldoNOtopAbpl: number;
  saldoNGvsAbpl: number;
  saldoNVodaAbplPodacha: number;
  saldoNVodaAbplStoki: number;
  saldoNVyvozOthodovAbp: number;
  saldoNOtopVnes: number;
  saldoNGvsVnes: number;
  saldoNVodaPodachaVnes: number;
  saldoNVodaStokiVnes: number;
  saldoNKvplataVnes: number;

  nachislVoda: number;
  nachislVyvozOthodov: number;
  nachislKvplata: number;
  nachislOtop: number;
  nachislElectro: number;
  nachislGaz: number;
  nachislGvs: number;
  nachislParking: number;
  nachislOharna: number;
  nachislOtopAbpl: number;
  nachislGvsAbpl: number;
  nachislVodaAbplPodacha: number;
  nachislVodaAbplStoki: number;
  nachislVyvozOthodovAbpl: number;
  nachislOtopVnes: number;
  nachislGvsVnes: number;
  nachislVodaPodachaVnes: number;
  nachislVodaStokiVnes: number;
  nachislKvplataVnes: number;

  vozvratVoda: number;
  vozvratVyvozOthodov: number;
  vozvratKvplata: number;
  vozvratOtop: number;
  vozvratElectro: number;
  vozvratGaz: number;
  vozvratGvs: number;
  vozvratParking: number;
  vozvratOharna: number;
  vozvratOtopAbpl: number;
  vozvratGvsAbpl: number;
  vozvratVodaAbplPodacha: number;
  vozvratVodaAbplStoki: number;
  vozvratVyvozOthodovAbpl: number;
  vozvratOtopVnes: number;
  vozvratGvsVnes: number;
  vozvratVodaPodachaVnes: number;
  vozvratVodaStokiVnes: number;
  vozvratKvplataVnes: number;

  oplataVoda: number;
  oplataVyvozOthodov: number;
  oplataKvplata: number;
  oplataOtop: number;
  oplataElectro: number;
  oplataGaz: number;
  oplataGvs: number;
  oplataParking: number;
  oplataOharna: number;
  oplataOtopAbpl: number;
  oplataGvsAbpl: number;
  oplataVodaAbplPodacha: number;
  oplataVodaAbplStoki: number;
  oplataVyvozOthodovAbpl: number;
  oplataOtopVnes: number;
  oplataGvsVnes: number;
  oplataVodaPodachaVnes: number;
  oplataVodaStokiVnes: number;
  oplataKvplataVnes: number;

  subsVoda: number;
  subsVyvozOthodov: number;
  subsKvplata: number;
  subsOtop: number;
  subsElectro: number;
  subsGaz: number;
  subsGvs: number;
  subsParking: number;
  subsOharna: number;
  subsOtopAbpl: number;
  subsGvsAbpl: number;
  subsVodaAbplPodacha: number;
  subsVodaAbplStoki: number;
  subsVyvozOthodovAbpl: number;
  subsOtopVnes: number;
  subsGvsVnes: number;
  subsVodaPodachaVnes: number;
  subsVodaStokiVnes: number;
  subsKvplataVnes: number;

  saldoKVoda: number;
  saldoKVyvozOthodov: number;
  saldoKKvplata: number;
  saldoKOtop: number;
  saldoKElectro: number;
  saldoKGaz: number;
  saldoKGvs: number;
  saldoKParking: number;
  saldoKOharna: number;
  saldoKOtopAbpl: number;
  saldoKGvsAbpl: number;
  saldoKVodaAbplPodacha: number;
  saldoKVodaAbplStoki: number;
  saldoKVyvozOthodovAbpl: number;
  saldoKOtopVnes: number;
  saldoKGvsVnes: number;
  saldoKVodaPodachaVnes: number;
  saldoKVodaStokiVnes: number;
  saldoKKvplataVnes: number;
};

export interface OplataItemT {
  dataPerevoda: Date;
  sumOplata: number;
  nOrg: string;
  tag: string;
  startDate: Date;
  endDate: Date;
  errorCode: number;
  errorMsg: string;
};

export enum WaterSupplyRentEnum {
  dataPerevoda = "dataPerevoda",
  sumOplata = "sumOplata",
  nOrg = "nOrg",
};

export const kvartplataObj = {
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
  nKvplataTarifa: "",
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
};
