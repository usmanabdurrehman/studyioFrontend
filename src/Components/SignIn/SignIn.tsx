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
  Text,
} from "@chakra-ui/react";
import { Field, FieldProps, Formik } from "formik";
import React, { memo, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/store";

const SignIn = memo(() => {
  const initialValues = useMemo(
    () => ({
      email: "",
      password: "",
      rememberMe: false,
    }),
    []
  );

  const { mutateAsync: signin } = useSignin();
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ rememberMe, ...values }) => {
        const data = await signin(values);
        console.log({ data });
        if (data?.user) {
          setUser(data?.user);
          router.push("/timeline");
        }
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
                >
                  Sign In
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
