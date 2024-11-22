export interface NewsT {
  newsId: number
  deleted: boolean
  userChg: string
  dateChg: string
  organizationId: number
  newsDate: string
  newsText: string
  organization: string | null
}

export interface OrganizationDataT {
  name: string
  description: string
  contactAddress: string
  contactPhone: string
}