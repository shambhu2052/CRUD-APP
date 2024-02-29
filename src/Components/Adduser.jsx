import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import Title from "./Styledcomponents/Title";
import Input from "./Styledcomponents/Input";
import Button from "./Styledcomponents/Button";
import { useForm } from "react-hook-form";
const Adduser = ({ refetch }) => {
  const [post, setPost] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const AddUser = async (newuser) => {
    const response = await axios.post("http://localhost:3002/User", newuser);

    return response.data;
  };
  const { data, isError, isLoading, mutate, reset } = useMutation({
    mutationFn: AddUser,
    mutationKey: ["aadeduser"],
    onSuccess: () => {
      console.log("Successfully added ");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setPost({ id: "", firstname: "", lastname: "", email: "" });
    console.log(post);
    mutate(post);
    if (post) {
      alert("added user succesfully");
      refetch();
      reset();
    }
  };
  const Wrapper = styled.section`
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  `;
  if (isLoading) {
    return <h2>Adding User....</h2>;
  }
  if (isError) {
    return <h2>error in Adding User...</h2>;
  }
  return (
    <Wrapper>
      <Title>Add User</Title>
      <form onSubmit={handleSubmit} className="flex gap-2 ">
        <div className="flex flex-col gap-4 ">
          <label className="py-2">Userid</label>
          <label className="py-2">FirstName:</label>
          <label className="py-2">LastName:</label>
          <label className="py-2">Email</label>--
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Input
            type="number"
            name="id"
            placeholder="Enter UserId"
            value={post.id}
            onChange={handleChange}
          />

          <Input
            type="text"
            name="firstname"
            placeholder="Enter Firstname"
            value={post.firstname}
            onChange={handleChange}
          />

          <Input
            type="text"
            name="lastname"
            placeholder="Enter Lastname"
            value={post.lastname}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Enter Gmail Account"
            value={post.email}
            onChange={handleChange}
          />
          <Button type="submit">Add User</Button>
          {/* <button
            type="submit"
            className="text-white bg-black rounded-md  py-2 max-w-[200px]"
          >
            Add User
          </button> */}
        </div>
      </form>
    </Wrapper>
  );
};

export default Adduser;
