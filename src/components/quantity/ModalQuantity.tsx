import {
  ActionIcon,
  Button,
  NumberInput,
  useMantineTheme,
  type NumberInputHandlers,
} from "@mantine/core";
import { type WineBottle } from "@prisma/client";
import React, { useRef, useState } from "react";

type ModalQuantityProps = {
  wineBottle: WineBottle & { format: { name: string; capacity: string } };
  handleUpdateQuantity: (id: number, quantity: number) => Promise<void>;
};

const ModalQuantity = ({
  wineBottle,
  handleUpdateQuantity,
}: ModalQuantityProps) => {
  const theme = useMantineTheme();
  const [quantity, setQuantity] = useState(wineBottle.quantity);
  const handlers = useRef<NumberInputHandlers>();

  const handleClick = () => {
    handleUpdateQuantity(wineBottle.id, quantity)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flexcol gap-3 rounded-md bg-slate-500 p-3">
      <h3 className="text-center text-xl font-semibold text-white">{`${wineBottle.format.name} (${wineBottle.format.capacity})`}</h3>
      <div className="flexcol gap-3 pl-5">
        <div className="flexrow gap-3">
          <p className="text-white">
            {wineBottle.quantity > 1 ? "Quantités :" : "Quantité :"}
          </p>
          <div className="flexrow gap-3">
            <ActionIcon
              variant="default"
              onClick={() => handlers?.current?.decrement()}
            >
              –
            </ActionIcon>

            <NumberInput
              hideControls
              value={wineBottle.quantity}
              onChange={(value) => setQuantity(value as number)}
              handlersRef={handlers}
              size="sm"
              styles={{
                input: {
                  textAlign: "center",
                  width: "70px",
                  height: "28px ",
                  minHeight: "0",
                },
              }}
            />

            <ActionIcon
              variant="default"
              onClick={() => handlers?.current?.increment()}
            >
              +
            </ActionIcon>
          </div>
        </div>
        <div className="flexrow gap-3">
          <p className="text-white">Prix/b (€) : </p>
          <NumberInput
            hideControls
            value={wineBottle.price}
            size="sm"
            disabled
            pl={40}
            styles={{
              input: {
                textAlign: "center",
                width: "70px",
                height: "28px ",
                minHeight: "0",
              },
            }}
          />
        </div>
        <div className="flex w-full justify-end">
          <Button
            type="submit"
            size="sm"
            style={{
              backgroundImage: theme.fn.gradient({
                from: "teal",
                to: "lime",
                deg: 45,
              }),
            }}
            onClick={handleClick}
            disabled={quantity === wineBottle.quantity}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalQuantity;
