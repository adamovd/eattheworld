"use client";
import { useForm, Resolver } from "react-hook-form";
import { User } from "../../Models/dbTypes";
import { ChangeEvent, useState } from "react";
import { countryList } from "../../../helpers/country-list";
import { UploadButton } from "../../../helpers/uploadthing";
import { registerNewUser } from "../../Services/userServices";
import { useRouter } from "next/navigation";
import React from "react";
import { InputField } from "@/app/Styles/Components/InputFields";
import { Button } from "@/app/Styles/Components/Buttons";
import axios from "axios";

const RegistrationForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const defaultOption = "Select a country";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<User>();
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      registerNewUser(data);
      reset();
      setValue("nationality", defaultOption);
      router.push("/sign-in");
    } catch (error) {
      console.error("Error while register", error);
    }
  });
  const handleCountryChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryValue = e.target.value;
    setSelectedCountry(selectedCountryValue);
    setValue("nationality", selectedCountryValue);
    const country = countryList.find(
      (country) => country.name === selectedCountryValue
    );
    console.log(country?.code);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${country?.code}?fields=latlng,flags`
      );

      const countryInfo = response.data;
      console.log(countryInfo);

      setValue("lat", countryInfo.latlng[0]);
      setValue("lng", countryInfo.latlng[1]);
      setValue("flag", countryInfo.flags.svg);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  const handleUploadComplete = (res: any[]) => {
    const url = res.map((image) => {
      return image.url;
    });
    setValue("image", url.toString());
    setUploading(false);
  };

  const handleUploadError = (error: Error) => {
    alert(`ERROR! ${error.message}`);
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <InputField
                  {...register("firstname")}
                  bgcolor="--Light"
                  textcolor="--Dark"
                  width="350px"
                  fontSize="1rem"
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <InputField
                  {...register("lastname")}
                  bgcolor="--Light"
                  textcolor="--Dark"
                  width="350px"
                  fontSize="1rem"
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <InputField
                  {...register("email")}
                  bgcolor="--Light"
                  textcolor="--Dark"
                  width="350px"
                  fontSize="1rem"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <InputField
                  {...register("password")}
                  bgcolor="--Light"
                  textcolor="--Dark"
                  width="350px"
                  fontSize="1rem"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                More
              </p>
            </div>
            <div>
              <label
                htmlFor="nationality"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Where are you from?
              </label>
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled selected>
                  {defaultOption}
                </option>
                {countryList.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="profilepicture"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile picture
              </label>
              <div className="mt-2">
                <div className="flex sm:max-w-md">
                  <Button
                    bgcolor="--Yellow"
                    textcolor="--Dark"
                    fontSize="1rem"
                    type="button"
                  >
                    <UploadButton
                      className="uploadButton"
                      endpoint="imageUploader"
                      onClientUploadComplete={handleUploadComplete}
                      onUploadError={handleUploadError}
                      onUploadProgress={() => setUploading(true)}
                    />
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="bio"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Biography
              </label>
              <div className="mt-2">
                <textarea
                  {...register("bio")}
                  id="bio"
                  name="bio"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  placeholder="Short description of yourself and your food and travel..."
                />
              </div>
            </div>

            <div>
              <Button
                bgcolor="--DarkGreen"
                textcolor="--Light"
                fontSize="1rem"
                type="submit"
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
