"use client";
import { useForm, Resolver } from "react-hook-form";
import { Country } from "../../../Models/dbTypes";
import { createNewCountry } from "../../../Services/countryServices";
import { UploadButton } from "../../../../helpers/uploadthing";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { countryList } from "../../../../helpers/country-list";
import { Button } from "@/app/Styles/Components/Buttons";
import {
  InputContainer,
  InputField,
  InputLabel,
  TextArea,
} from "@/app/Styles/Components/InputFields";
import {
  DropdownOption,
  DropdownSelect,
} from "@/app/Styles/Components/Dropdown";
import Custom403 from "@/app/error/403/page";
import { useSession } from "next-auth/react";
import { FormContainer } from "@/app/Styles/Components/Containers";
import { FormTitle } from "@/app/Styles/Components/Fonts";
import PageWrapper from "@/app/Components/PageWrapper";
import { UploadDropzone } from "@uploadthing/react";

// eslint-disable-next-line @next/next/no-async-client-component
export default function CountryForm() {
  const [selectedCountry, setSelectedCountry] = useState("");
  let [uploadingProgress, setUploadingProgress] = useState(0);
  const { data: session } = useSession();
  const defaultOption = "Select a country";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Country>();
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);

      await createNewCountry(data);
      reset();
    } catch (error) {
      console.error("Error creating new country:", error);
    }
  });

  const handleCountryChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryValue = e.target.value;
    setSelectedCountry(selectedCountryValue);
    setValue("name", selectedCountryValue);
    const country = countryList.find(
      (country) => country.name === selectedCountryValue
    );
    console.log(country?.code);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${country?.code}?fields=latlng,population,capital,continents,area,flags`
      );

      const countryInfo = response.data;
      console.log(countryInfo);

      setValue("population", countryInfo.population);
      setValue("lat", countryInfo.latlng[0]);
      setValue("lng", countryInfo.latlng[1]);
      setValue("area", countryInfo.area);
      setValue("capital", countryInfo.capital[0]);
      setValue("continent", countryInfo.continents[0]);
      setValue("flag", countryInfo.flags.svg);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  const handleUploadComplete = (res: any[]) => {
    const url = res.map((image) => {
      return image.url;
    });
    setValue("imageUrl", url.toString());
  };

  const handleUploadError = (error: Error) => {
    alert(`ERROR! ${error.message}`);
  };
  if (session?.user?.role === "admin") {
    return (
      <PageWrapper>
        <FormContainer>
          <FormTitle>Register Country</FormTitle>
          <form onSubmit={onSubmit}>
            <InputContainer>
              <InputLabel htmlFor="name">Select a country</InputLabel>
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
              <InputLabel htmlFor="about">Description</InputLabel>

              <TextArea
                {...register("description")}
                id="description"
                name="description"
                rows={3}
                defaultValue={""}
                placeholder="Short description of the country's food culture"
              />
            </InputContainer>
            <InputContainer>
              <InputLabel htmlFor="imageUrl">Image</InputLabel>
              {/*// @ts-expect-error */}
              <UploadDropzone<OurFileRouter>
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                config={{ mode: "auto" }}
                onUploadProgress={(number: number) =>
                  setUploadingProgress(number)
                }
              />
              {uploadingProgress < 100 ? (
                <small>{uploadingProgress} %</small>
              ) : (
                <small>done!</small>
              )}
            </InputContainer>

            <InputContainer>
              <InputLabel htmlFor="playlistUrl">Playlist</InputLabel>

              <InputField
                {...register("playlistUrl")}
                bgcolor="--Light"
                textcolor="--Dark"
                fontSize="1rem"
                placeholder="URL to playlist"
                id="playlistUrl"
                name="playlistUrl"
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
                Save
              </Button>
            </InputContainer>
          </form>
        </FormContainer>
      </PageWrapper>
    );
  } else {
    return <Custom403 />;
  }
}
