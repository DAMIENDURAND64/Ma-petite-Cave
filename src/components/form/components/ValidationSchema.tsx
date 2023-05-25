import * as yup from "yup";

const currentYearPlus3 = new Date().getFullYear() + 3;

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(100, "Name must be at most 100 characters long"),

    producer: yup
      .string()
      .required("Producer is required")
      .min(3, "Producer must be at least 3 characters long")
      .max(100, "Producer must be at most 100 characters long"),

    country: yup
      .string()
      .required("Country is required")
      .min(3, "Country must be at least 3 characters long")
      .max(100, "Country must be at most 100 characters long"),

    region: yup
      .string()
      .required("Region is required")
      .min(3, "Region must be at least 3 characters long")
      .max(100, "Region must be at most 100 characters long"),

    wineColorId: yup.string().required("Select a color"),

    vintage: yup
      .number()
      .required("Vintage is required")
      .min(1900, "Vintage must be at least 1900")
      .max(currentYearPlus3, `Vintage must be at most ${currentYearPlus3}`)
      .typeError("Vintage is required"),

    purchasedAt: yup
      .date()
      .required("Purchased at is required")
      .max(new Date(), "Purchased at must be in the past")
      .min(new Date(1900, 1, 1), "Purchased at must be at least 1900"),

    servingTemperature: yup
      .string()
      .required("Serving temperature is required")
      .min(2, "Serving temperature must be at least 2 characters long")
      .max(10, "Serving temperature must be at most 10 characters long"),

    formats: yup
      .array()
      .of(yup.string())
      .required("Select at least one format"),

    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .required("Quantity is required")
      .min(1, "Quantity must be greater than 0"),

    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required")
      .min(1, "Price must be greater than 0"),

    description: yup.string().required("Description is required"),
  })
  .required();

export default schema;
