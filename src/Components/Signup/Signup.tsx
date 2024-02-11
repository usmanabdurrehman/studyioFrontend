"use client";

import { useSignup } from "../../mutations";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Field, FieldProps, Formik } from "formik";
import React, { memo, useCallback, useMemo } from "react";
import Link from "next/link";
import { buildFormikFormData } from "@/utils";
import { useProgressRouter } from "@/hooks";
import * as Yup from "yup";

interface SignupProps {}

type SignupForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const initialValues: SignupForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("The first name is required"),
  email: Yup.string().required("The email is required"),
  password: Yup.string().required("The password is required"),
});

const Signup = memo(function Signup({}: SignupProps) {
  const router = useProgressRouter();

  const { mutateAsync: signup, isLoading } = useSignup();

  const onSubmit = useCallback(
    async (values: SignupForm) => {
      const data = await signup(buildFormikFormData(values));
      if (data?.status) router.push("/signin");
    },
    [signup, router]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignUpSchema}
    >
      {({ submitForm }) => {
        return (
          <Flex height="100vh" gap={6}>
            <Flex width={300} alignItems={"center"} p={5}>
              <div>
                <Text fontSize={"3xl"}>Sign Up</Text>
                <Field name="firstName">
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={!!meta.error} isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="lastName">
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={!!meta.error}>
                      <FormLabel>Last Name</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={!!meta.error} isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={!!meta.error} isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  colorScheme={"blue"}
                  size="sm"
                  mt={4}
                  onClick={submitForm}
                  width="80px"
                >
                  {isLoading ? <Spinner size="xs" /> : "Sign up"}
                </Button>
                <Text fontSize="sm" mt={2}>
                  Already have an account?{" "}
                  <u>
                    <Link href="/signin">Sign in</Link>
                  </u>
                </Text>
              </div>
            </Flex>
            <Box
              flex="1"
              bg={'url("./cover/signup.jpg")'}
              backgroundSize="cover"
            />
          </Flex>
        );
      }}
    </Formik>
  );
});

export default Signup;
