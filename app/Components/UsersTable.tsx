"use client";
import { User } from "@prisma/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { getAllUsers } from "../Services/userServices";

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response);
      console.log(response);
    });
  }, []);
  return (
    <section className="my-5 mx-5 h-full overflow-y-scroll">
      <ul role="list" className="divide-y divide-gray-100 max-h-5">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Image
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={user.image as string}
                alt="Image from country"
                width={100}
                height={100}
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
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersTable;
