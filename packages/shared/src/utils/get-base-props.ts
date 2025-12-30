import { BaseEntityProps } from "../types";
import { v4 as uuidv4 } from "uuid";

const getBaseProps = (): BaseEntityProps => ({
  uuid: uuidv4(),
  createdAt: new Date(),
  updatedAt: new Date(),
});

export default getBaseProps;
