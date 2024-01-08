import { Country } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { CountryList } from "../Styles/Components/Lists";

const VisitedCountries = ({ countries }: { countries: Country[] }) => {
  return (
    <ul>
      {countries.map((country, index) => (
        <Link key={index} href={`/country/${country.id}`}>
          <CountryList>
            <section>
              <Image
                src={country.flag as string}
                alt={`Flag of ${country.name}`}
                width={50}
                height={30}
              />
            </section>
            <section>
              <h2>{country.name}</h2>
            </section>
          </CountryList>
        </Link>
      ))}
    </ul>
  );
};

export default VisitedCountries;
