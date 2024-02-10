"use client";

import { useSignin } from "@/mutations/useSignin";
import {
  Box,
  Button,
  Checkbox,
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
import { useProgressRouter } from "@/hooks";

const SignIn = memo(() => {
  const initialValues = useMemo(
    () => ({
      email: "",
      password: "",
      rememberMe: false,
    }),
    []
  );

  const { mutateAsync: signin, isLoading } = useSignin();

  const router = useProgressRouter();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          const data = await signin(values);
          if (data?.auth) {
            router.push("/timeline");
          }
        } catch (err) {}
      }}
    >
      {({ submitForm }) => {
        return (
          <Flex height="100vh" gap={6}>
            <Box
              flex="3"
              bg={'url("./cover/signin.jpg")'}
              backgroundSize="cover"
            />
            <Flex flex="1" alignItems={"center"} p={5}>
              <div>
                <Text fontSize={"3xl"}>Sign In</Text>
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
                      <Input {...field} />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="rememberMe">
                  {({ field }: FieldProps) => (
                    <FormControl mt={2}>
                      <Checkbox {...field} colorScheme="blue">
                        Remember Me
                      </Checkbox>
                    </FormControl>
                  )}
                </Field>
                <Button
                  colorScheme={"blue"}
                  size="sm"
                  mt={2}
                  onClick={submitForm}
                  width={100}
                >
                  {isLoading ? <Spinner size="xs" /> : "Sign In"}
                </Button>
                <Text fontSize="sm" mt={2}>
                  Haven&apos;t got an account?{" "}
                  <u>
                    <Link href="/signup">Sign up</Link>
                  </u>
                </Text>
              </div>
            </Flex>
          </Flex>
        );
      }}
    </Formik>
  );
});

export default SignIn;
