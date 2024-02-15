import { Template } from "@/constants/types/homeType";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";

type Props = {
  itemDetail?: Template;
};

const CardTemplate = ({ itemDetail }: Props) => {
  return (
    <Card className="py-4 pb-9">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <a href={itemDetail?.url}>
          <Button className="" color="primary" radius="full" size="sm">
            Download
          </Button>
        </a>
        <h4 className="font-bold text-large">{itemDetail?.name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
  );
};

export default CardTemplate;
