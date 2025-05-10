import { OplataItemT, WaterSupplyRentEnum } from '@/types'
import AccardionForWaterTabs from './AccardionForWaterTabs'
import { useTranslation } from 'react-i18next';
import { getDataForWaterTab } from '@/utils/getValidDataFunctions';
import { WATER_SUPPLY_TAG_VALUES } from '@/utils/constants';

type Props = {
  rentOplataData: OplataItemT[],
}

const RentDataTab = ({ rentOplataData }: Props) => {
  const { t } = useTranslation();

    const accordionData = [
      {
        label: t("rent"),
        accordValue: "oplata",
        heads: ["Дата зарахування оплати", "Сума оплати", "Банк"],
        styles: [
          "font-bold text-center bg-gray-300",
          "font-medium text-right",
          "font-medium text-right",
        ],
        data: getDataForWaterTab<OplataItemT>(
          rentOplataData,
          WaterSupplyRentEnum,
          ({ tag }) => WATER_SUPPLY_TAG_VALUES.includes(tag),
          [WaterSupplyRentEnum.dataPerevoda],
        ),
      },
    ];

  return (
    <AccardionForWaterTabs accordionData={accordionData}/>
  )
}

export default RentDataTab