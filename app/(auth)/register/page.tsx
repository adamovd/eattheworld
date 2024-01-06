"use client";
import { useForm, Resolver } from "react-hook-form";
import { User } from "@/app/Models/dbTypes";
import { ChangeEvent, useState } from "react";
import { countryList } from "@/helpers/country-list";
import { registerNewUser } from "@/app/Services/userServices";
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
import { UploadButton } from "@/helpers/uploadthing";

const RegistrationForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  let [uploadingProgress, setUploadingProgress] = useState(0);
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
            <InputLabel htmlFor="firstname">First name</InputLabel>

            <InputField
              {...register("firstname")}
              bgcolor="--Light"
              textcolor="--Dark"
              fontSize="1rem"
              id="firstname"
              name="firstname"
              type="text"
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="lastname">Last name</InputLabel>

            <InputField
              {...register("lastname")}
              bgcolor="--Light"
              textcolor="--Dark"
              fontSize="1rem"
              id="lastname"
              name="lastname"
              type="text"
              required
            />
          </InputContainer>

          <InputContainer>
            <InputLabel htmlFor="email">Email address</InputLabel>

            <InputField
              {...register("email")}
              bgcolor="--Light"
              textcolor="--Dark"
              fontSize="1rem"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </InputContainer>

          <InputContainer>
            <InputLabel htmlFor="password">Password</InputLabel>

            <InputField
              {...register("password")}
              bgcolor="--Light"
              textcolor="--Dark"
              fontSize="1rem"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="nationality">Where do you live?</InputLabel>
            <DropdownSelect
              value={selectedCountry}
              onChange={handleCountryChange}
              id="name"
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
            <InputLabel htmlFor="profilepicture">Profile picture</InputLabel>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              onUploadProgress={(number: number) =>
                setUploadingProgress(number)
              }
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="bio">Biography</InputLabel>

            <TextArea
              {...register("bio")}
              id="bio"
              name="bio"
              rows={3}
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
              disabled={uploadingProgress < 100}
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
