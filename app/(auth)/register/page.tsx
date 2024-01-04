"use client";
import { useForm, Resolver } from "react-hook-form";
import { User } from "../../Models/dbTypes";
import { ChangeEvent, useRef, useState } from "react";
import { countryList } from "../../../helpers/country-list";
import { UploadButton } from "../../../helpers/uploadthing";
import { registerNewUser } from "../../Services/userServices";
import { useRouter } from "next/navigation";
import React from "react";
import {
  InputContainer,
  InputField,
  InputLabel,
  TextArea,
} from "@/app/Styles/Components/InputFields";
import { Button } from "@/app/Styles/Components/Buttons";
import axios from "axios";
import { FormContainer } from "@/app/Styles/Components/Containers";
import { FormTitle } from "@/app/Styles/Components/Fonts";
import {
  DropdownOption,
  DropdownSelect,
} from "@/app/Styles/Components/Dropdown";
import PageWrapper from "@/app/Components/PageWrapper";

const RegistrationForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  let [uploading, setUploading] = useState(false);
  const router = useRouter();
  const button = useRef(null);
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
    <PageWrapper>
      <FormContainer>
        <FormTitle>Register</FormTitle>

        <form onSubmit={onSubmit}>
          <InputContainer>
            <InputLabel
              htmlFor="firstname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </InputLabel>

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
          </InputContainer>
          <InputContainer>
            <InputLabel
              htmlFor="lastname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </InputLabel>

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
          </InputContainer>

          <InputContainer>
            <InputLabel
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </InputLabel>

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
          </InputContainer>

          <InputContainer>
            <InputLabel
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </InputLabel>

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
          </InputContainer>
          <InputContainer>
            <InputLabel
              htmlFor="nationality"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Where do you live?
            </InputLabel>
            <DropdownSelect
              value={selectedCountry}
              onChange={handleCountryChange}
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <DropdownOption value="" disabled selected>
                {defaultOption}
              </DropdownOption>
              {countryList.map((country, index) => (
                <DropdownOption key={index} value={country.name}>
                  {country.name}
                </DropdownOption>
              ))}
            </DropdownSelect>
          </InputContainer>
          <InputContainer>
            <InputLabel
              htmlFor="profilepicture"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Profile picture
            </InputLabel>

            <Button
              bgcolor="--Yellow"
              textcolor="--Dark"
              fontSize="1rem"
              type="button"
              style={{ gap: "2rem" }}
            >
              <UploadButton
                className="uploadButton"
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                onUploadProgress={() => setUploading}
              />
            </Button>
          </InputContainer>
          <InputContainer>
            <InputLabel
              htmlFor="bio"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Biography
            </InputLabel>

            <TextArea
              {...register("bio")}
              id="bio"
              name="bio"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
              placeholder="Short description of yourself and your food and travel..."
            />
          </InputContainer>
          <InputContainer>
            <Button
              bgcolor="--DarkGreen"
              textcolor="--Light"
              fontSize="1rem"
              type="submit"
              disabled={uploading ? true : false}
            >
              Register
            </Button>
          </InputContainer>
        </form>
      </FormContainer>
    </PageWrapper>
  );
};

export default RegistrationForm;
