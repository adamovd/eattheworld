"use client";
import { User } from "@prisma/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { getAllUsers } from "../Services/userServices";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCountryById } from "../Services/countryServices";
import { Button } from "../Styles/Components/Buttons";

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  return (
    <section className="my-5 w-full h-full overflow-y-scroll">
      <ul
        role="list"
        style={{ width: "80vw", height: "100vh" }}
        className="divide-y w-full max-h-5 pb-10 mb-16"
      >
        {users.map((user) => (
          <li key={user.id} className="flex justify-around gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Image
                className="flex-none h-8 w-8 rounded"
                src={user.image as string}
                alt="Image from user"
                width={0}
                height={0}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {user.firstname + " " + user.lastname}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                Created:{" "}
                {format(
                  new Date(user.createdAt),
                  "dd/MM/yyyy - HH:mm"
                ).toString()}
              </p>
            </div>
            <Button
              style={{ alignSelf: "end" }}
              bgcolor="--Red"
              textcolor="--Light"
              fontSize="1rem"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersTable;
