import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Adduser from "./Adduser";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Title from "./Styledcomponents/Title";
import { Secondarybutton } from "./Styledcomponents/Button";

const Home = () => {
  const getUserdata = async () => {
    const response = await axios.get("http://localhost:3002/User");
    const data = await response.data;
    return data;
  };
  const {
    isLoading,
    data: User,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["Userinformation"],
    queryFn: getUserdata,
  });
  const deleteUser = async (userid) => {
    console.log(userid, "user id 2");
    const deleteresponse = await axios
      .delete(`http://localhost:3002/User/${userid}`)
      .then((res) => {
        console.log(res, "response datas");
        if (res?.status === 200) {
          refetch();
        }
      });
    return deleteresponse.data;
  };
  const { mutate } = useMutation({
    mutationKey: ["deleteuser"],
    mutationFn: deleteUser,
    onSuccess: () => {
      refetch();
    },
  });
  const handleDelete = (userid) => {
    console.log(userid, "user id");
    mutate(userid);
  };
  console.log("Userdata", User);
  const Wrapper = styled.section`
    max-width: 1120px;
    margin-right: auto;
    margin-left: auto;
    padding: 28px;
  `;
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <h3>Data Fetching Error...</h3>;
  }

  return (
    <>
      <Adduser refetch={refetch} />

      <Wrapper>
        <Title>User List</Title>

        <div className="w-full flex items-center justify-center">
          <table className="table-auto  border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {User.map((val, index) => (
                <tr className="border-b border-gray-200" key={index}>
                  <td className="px-4 py-2">{val.id}</td>
                  <td className="px-4 py-2">{val.firstname}</td>
                  <td className="px-4 py-2">{val.lastname}</td>
                  <td className="px-4 py-2">{val.email}</td>
                  <td className="flex gap-1 items-center py-1">
                    <Link
                      to={`/update/${val.id}`}
                      className="px-3 py-1 bg-black text-white rounded-md "
                    >
                      Edit
                    </Link>
                    <Secondarybutton onClick={() => handleDelete(val.id)}>
                      Delete
                    </Secondarybutton>
                    {/* <button
                      className="px-3 py-1 bg-black text-white rounded-md "
                      onClick={() => handleDelete(val.id)}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}

              {/* Add more <tr> for additional rows if needed */}
            </tbody>
          </table>
        </div>
      </Wrapper>
    </>
  );
};

export default Home;
