"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../common/Heading";
import Input from "../inputs/Input";
import {toast} from 'react-hot-toast'
import Button from "../common/Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";

function LoginModal() {
  const loginModal = useLoginModal();
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    signIn('credentials',{
        ...data,
        redirect:false
    }).then((callback)=> {
        setIsLoading(false)
        if(callback?.ok) {
            toast.success('Logged In')
            router.refresh()
            loginModal.onClose()
        }
        if(callback?.error) {
            toast.error(callback.error)
        }
    })
  };

  const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading center
            title="Welcome to Airbnb"
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
            
        </div>
    )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log In"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
