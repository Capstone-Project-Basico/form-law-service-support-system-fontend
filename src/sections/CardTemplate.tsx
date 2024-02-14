import { Template } from "@/constants/types/homeType";

type Props = {
  itemDetail?: Template;
};

const CardTemplate = ({ itemDetail }: Props) => {
  return (
    <div>
      <div className="font-bold ">{itemDetail?.name}</div>
    </div>
  );
};

export default CardTemplate;
