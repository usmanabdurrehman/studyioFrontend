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
import React, { memo, useCallback, useMemo } from "react";
import Link from "next/link";
import { useProgressRouter } from "@/hooks";
import * as Yup from "yup";

type SigninForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const initialValues: SigninForm = {
  email: "",
  password: "",
  rememberMe: false,
};

const SignInSchema = Yup.object().shape({
  email: Yup.string().required("The email is required"),
  password: Yup.string().required("The password is required"),
});

const SignIn = memo(function SignIn() {
  const { mutateAsync: signin, isLoading } = useSignin();

  const router = useProgressRouter();

  const onSubmit = useCallback(
    async (values: SigninForm) => {
      const data = await signin(values);
      if (data?.auth) router.push("/timeline");
    },
    [router, signin]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignInSchema}
    >
      {({ submitForm }) => {
        return (
          <Flex height="100vh" gap={6}>
            <Box
              flex="1"
              bg={'url("./cover/signin.jpg")'}
              backgroundSize="cover"
            />
            <Flex width={300} alignItems={"center"} p={5}>
              <div>
                <Text fontSize={"3xl"}>Sign In</Text>
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
                  width={"80px"}
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