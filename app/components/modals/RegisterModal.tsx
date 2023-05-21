"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../common/Heading";
import Input from "../inputs/Input";
import {toast} from 'react-hot-toast'
import Button from "../common/Button";

function RegisterModal() {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success('Registered !')
        registerModal.onClose();
      })
      .catch((error) => {
        {/** LOOK */}
        toast.error('Something else ')
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title="Welcome to Airbnb"
            subtitle="Create an Account!" 
            />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="name"
                label="User name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col items-center gap-4 pt-3 border-t-[1px] border-neutral-300">
            <Button onClick={()=> null} label="Continue with Google" outline icon={FcGoogle} />
            <Button onClick={()=> null} label="Continue with GitHub" outline icon={AiFillGithub} />
            <div className="flex flex-row items-center gap-2 mt-4">
                <div>
                    Already have an account?
                </div>
                <div className="text-blue-500 font-bold cursor-pointer">Log in</div>
            </div>
        </div>
    )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={registerModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
