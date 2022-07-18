import Link from 'next/link';
import type { NextPage } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from "next/router";
import Head from 'next/head';
import { z } from "zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { format } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateWeightInputType,
  createWeightValidator,
} from "../../shared/create-weight-validator";
import { trpc } from '../../utils/trpc';


const Weights = () => {
  const { query } = useRouter();
  //const { page = 1, limit = 10 } = query;
  const page = typeof query?.page === "string" ? +query.page : 1;
  const limit = typeof query?.limit === "string" ? +query.limit : 10;

  const { data, isLoading } = trpc.useQuery(['health.get-all-weight', { skip: limit * (page - 1), take: limit }]);
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="max-w-xl mx-auto pb-12 w-full">
        {data.map((d) => (
          <div className="flex flex-row p-2" key={d.id}>
            <div className="w-1/3">{format(d.createdAt, "yyyy-MM-dd")}</div>
            <div className="w-1/3">{d.weight}</div>
            <div className="w-1/2">{d.comment}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="p-2">
          <Link href={`/health/weight?page=${page - 1}&limit=${limit}`}>
            prev page
          </Link>
        </div>
        <div className="p-2">
          <Link href={`/health/weight?page=${page + 1}&limit=${limit}`}>
            next page
          </Link>
        </div>
      </div>
    </>
  )
}

const CreateWeightForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateWeightInputType>({
    resolver: zodResolver(createWeightValidator),
    defaultValues: {},
  });

  const client = trpc.useContext();

  const { mutate, isLoading, data } = trpc.useMutation("health.create", {
    onSuccess: (data) => {
      client.invalidateQueries(["health.get-all-weight"]);
    },
  });
  if (isLoading)
    return (
      <div className="antialiased min-h-screen flex items-center justify-center">
        <p className="text-white/40">Loading...</p>
      </div>
    );

  return (
    <div className="antialiased text-gray-100 p-6">
      <Head>
        <title>Logg | Weight</title>
      </Head>
      <header className="header flex w-full justify-between">
        <Link href={"/"}>
          <h1 className="text-4xl font-bold cursor-pointer">Weight Logger</h1>
        </Link>
      </header>

      <div className="max-w-xl mx-auto py-6 md:max-w-2xl">
        <h2 className="text-2xl font-bold">Logg weight</h2>

        <form
          onSubmit={handleSubmit((data) => {
            mutate(data);
          })}
          className="w-full"
        >
          <div className="mt-8 w-full">
            <div className="form-control my-10 w-full">
              <label className="label">
                <span className="label-text font-semibold text-base">
                  Your Question
                </span>
              </label>
              <input
                {...register("weight", {
                  valueAsNumber: true,
                })}
                type="text"
                className="input input-bordered w-full block text-gray-300 rounded-md"
                placeholder="Weight in KG"
              />
              {errors.weight && (
                <p className="text-red-400">{errors.weight.message}</p>
              )}
            </div>
            <div className="form-control my-10 w-full">
              <label className="label">
                <span className="label-text font-semibold text-base">
                  Comment
                </span>
              </label>
              <input
                {...register("comment")}
                type="text"
                className="input input-bordered w-full block text-gray-300 rounded-md"
                placeholder="comment"
              />
              {errors.comment && (
                <p className="text-red-400">{errors.comment.message}</p>
              )}
            </div>
            <div className="w-full mt-10">
              <input
                type="submit"
                className="btn w-full"
                value="Create question"
              />
            </div>
          </div>
        </form>
      </div >
    </div >
  )
}

const WeightCreator: React.FC = () => {
  return (
    <>
      <CreateWeightForm />
      <Weights />
    </>
  );
};

export default WeightCreator;
