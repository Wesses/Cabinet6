import { OplataItemT, WaterSupplyRentEnum } from '@/types'
import AccardionForWaterTabs from './AccardionForWaterTabs'
import { useTranslation } from 'react-i18next';
import { getDataForWaterTab } from '@/utils/getValidDataFunctions';
import { KVARTPLATA_TAG_VALUES } from '@/utils/constants';

type Props = {
  rentOplataData: OplataItemT[],
}

const RentDataTab = ({ rentOplataData }: Props) => {
  const { t } = useTranslation();

    const accordionData = [
      {
        label: t("payment"),
        accordValue: "oplata",
        heads: [t("date_of_rent"), t("rent_sum"), t("bank")],
        styles: [
          "font-bold text-center bg-gray-300",
          "font-medium text-right",
          "font-medium text-right",
        ],
        data: getDataForWaterTab<OplataItemT>(
          rentOplataData,
          WaterSupplyRentEnum,
          ({ tag }) => KVARTPLATA_TAG_VALUES.includes(tag),
          [WaterSupplyRentEnum.dataPerevoda],
        ),
      },
    ];

  return (
    <AccardionForWaterTabs accordionData={accordionData}/>
  )
}

export default RentDataTab