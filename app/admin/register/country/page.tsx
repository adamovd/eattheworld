"use client";
import { useForm, Resolver } from "react-hook-form";
import { Country } from "../../../Models/dbTypes";
import { createNewCountry } from "../../../Services/countryServices";
import { UploadButton } from "../../../../helpers/uploadthing";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { countryList } from "../../../../helpers/country-list";
import { Button } from "@/app/Styles/Components/Buttons";
import { InputField } from "@/app/Styles/Components/InputFields";
import {
  DropdownOption,
  DropdownSelect,
} from "@/app/Styles/Components/Drowdown";

// eslint-disable-next-line @next/next/no-async-client-component
export default function CountryForm() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [uploading, setUploading] = useState(false);
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

  return (
    <section className="flex my-10 mx-10">
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select a country
                  </label>
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
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("description")}
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    placeholder="Short description of the country's food culture"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                <div className="mt-2">
                  <div className="flex sm:max-w-md text-gray-800">
                    <Button
                      bgColor="--Yellow"
                      textColor="--Dark"
                      fontSize="1rem"
                    >
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={handleUploadComplete}
                        onUploadError={handleUploadError}
                        className="pb-1"
                      />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="playlistUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Playlist
                </label>
                <div className="mt-2">
                  <InputField
                    {...register("playlistUrl")}
                    bgColor="--Light"
                    textColor="--Dark"
                    fontSize="1rem"
                    width="400px"
                    placeholder="URL to playlist"
                    id="playlistUrl"
                    name="playlistUrl"
                    className="mb-5"
                  />
                </div>
              </div>
            </div>
            <Button
              bgColor="--DarkGreen"
              textColor="--Light"
              fontSize="1rem"
              type="submit"
              disabled={uploading}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
