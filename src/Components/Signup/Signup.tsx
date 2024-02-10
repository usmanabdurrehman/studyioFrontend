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
import React, { memo, useMemo } from "react";
import Link from "next/link";
import { buildFormikFormData } from "@/utils";
import { useProgressRouter } from "@/hooks";

interface SignupProps {}

const Signup = memo(({}: SignupProps) => {
  const initialValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }),
    []
  );

  const router = useProgressRouter();

  const { mutateAsync: signup, isLoading } = useSignup();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await signup(buildFormikFormData(values));
        router.push("/signin");
      }}
    >
      {({ submitForm }) => {
        return (
          <Flex height="100vh" gap={6}>
            <Flex flex="1" alignItems={"center"} p={5}>
              <div>
                <Text fontSize={"3xl"}>Sign Up</Text>
                <Field name="firstName">
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={!!meta.error}>
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
                    <FormControl isInvalid={!!meta.error}>
                      <FormLabel>Email</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={!!meta.error}>
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
              flex="3"
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
