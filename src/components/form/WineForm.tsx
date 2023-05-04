import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  name: string;
  producer: string;
  country: string;
  region: string;
  vintage: number;
  purchasedAt: Date;
  consumedAt: Date;
  quantity: number;
  unitPrice: number;
  description: string;
}
function WineForm() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} />
      <input {...register("producer", { required: true })} />
      <input {...register("country", { required: true })} />
      <input {...register("region", { required: true })} />
      <input {...register("vintage", { required: true })} />
      <input {...register("purchasedAt", { required: true })} />
      <input {...register("consumedAt", { required: true })} />
      <input {...register("quantity", { required: true })} />
      <input {...register("unitPrice", { required: true })} />
      <input {...register("description", { required: true })} />

      <input type="submit" />
    </form>
  );
}

export default WineForm;
