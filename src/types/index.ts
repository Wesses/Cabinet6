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
  kvartplata: {
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
  };
}

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

export type VodaAbplPodachaDataT = Partial<Pick<getAbonentCardT['vodaAbplPodacha'], 
  'vodaAbplPodacha' | 
  'abplPodachaTsenaGrn' | 
  'saldoNachVodaAbplPodacha' | 
  'nAbplPodachaTarifa'
>>;

export type VodaAbplStokiDataT = Partial<Pick<getAbonentCardT['vodaAbplStoki'], 
  'vodaAbplStoki' | 
  'abplStokiTsenaGrn' | 
  'saldoNachVodaAbplStoki' | 
  'nAbplStokiTarifa'
>>;
