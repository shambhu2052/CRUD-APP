import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "./Styledcomponents/Title";
import Button from "./Styledcomponents/Button";
const Update = () => {
  const { userId } = useParams();
  // const [updateInput, setUpdateInput] = useState({
  //   id: "",
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  // });
  const navigate = useNavigate();
  const [updateduser, setUpdateduser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const getdata = async () => {
    const response = await axios.get(`http://localhost:3002/User/${userId}`);
    const data = await response.data;
    setUpdateduser(data);
    return data;
  };

  const {
    data: Singledata,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["singledata"],
    queryFn: getdata,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateduser({ ...updateduser, [name]: value });
  };
  const updatedata = async (newdata) => {
    console.log(newdata, "new data");
    const response1 = await axios.put(
      `http://localhost:3002/User/${userId}`,
      newdata
    );
    console.log(response1, "response 1");
    return response1.data;
  };
  const { data, mutate } = useMutation({
    mutationKey: ["updatedsinglepagemutation", userId],
    mutationFn: updatedata,
    onSuccess: () => {
      alert("updated data successfully");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updated data", data);
    mutate(updateduser);
  };
  console.log("params", userId);
  console.log("Single Data", Singledata);
  console.log("updateddata", updateduser);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error in Updating Data....</h2>;
  }
  return (
    <div>
      {Singledata ? (
        <div className="max-w-[700px] mx-auto">
          <Title>Update User</Title>

          <form onSubmit={handleSubmit} className="flex gap-2 ">
            <div className="flex flex-col gap-4 ">
              <label className="py-2">Userid</label>
              <label className="py-2">FirstName:</label>
              <label className="py-2">LastName:</label>
              <label className="py-2">Email</label>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <input
                type="number"
                name="id"
                placeholder="enter UserId"
                value={updateduser.id}
                className="w-full px-4 py-2 rounded-md bg-gray-200 outline-none"
                onChange={handleChange}
              />

              <input
                type="text"
                name="firstname"
                className="w-full px-4 py-2 rounded-md bg-gray-200 outline-none"
                placeholder="Enter firstname"
                value={updateduser.firstname}
                onChange={handleChange}
              />

              <input
                type="text"
                name="lastname"
                className="w-full px-4 py-2 rounded-md bg-gray-200 outline-none"
                placeholder="Enter LastName"
                value={updateduser.lastname}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Enter Gmail Account"
                className="w-full px-4 py-2 rounded-md bg-gray-200 outline-none"
                value={updateduser.email}
                onChange={handleChange}
              />
              <Button type="submit">Update</Button>
              {/* <button
                type="submit"
                className="text-white bg-black rounded-md  py-2 max-w-[200px]"
              >
                Update
              </button> */}
            </div>
          </form>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
};

export default Update;
