export interface NewsT {
  newsId: number,
  deleted: boolean,
  userChg: string,
  dateChg: string,
  organizationId: number,
  newsDate: string,
  newsText: string,
  organization: string | null
}

export interface OrganizationDataT {
  name: string,
  description: string,
  contactAddress: string,
  contactPhone: string
}

export interface PersonalaccontsT {
  personalaccontsId: number,
  paLs: number,
  fio: string,
  nRayona: string,
  nUlitsi: string,
  nDoma: string,
  nKorp: string,
  nKvart: string,
  addres: string
}
