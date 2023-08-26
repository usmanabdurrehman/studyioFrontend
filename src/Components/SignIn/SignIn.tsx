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

const SignIn = memo(() => {
  const initialValues = useMemo(
    () => ({
      email: "",
      password: "",
      rememberMe: false,
    }),
    []
  );

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({}) => {
        return (
          <Flex height="100vh" gap={6}>
            <Box
              flex="3"
              bg={
                'url("https://media.istockphoto.com/id/1321462048/photo/digital-transformation-concept-system-engineering-binary-code-programming.jpg?s=612x612&w=0&k=20&c=Ib8RLw3_eCOo9N3YE4pvp9rcb_WmirjS-9x9R-vTd68=")'
              }
              backgroundSize="cover"
            />
            <Flex flex="1" alignItems={"center"}>
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
                <Button colorScheme={"blue"} size="sm" mt={2}>
                  Sign In
                </Button>
                {/* <p className={styles.linkText}>
                  Haven&apos;t got an account?{" "}
                  <u>
                    <Link className={styles.link} to="/signup">
                      Sign up
                    </Link>
                  </u>
                </p> */}
              </div>
            </Flex>
          </Flex>
        );
      }}
    </Formik>
  );
});

export default SignIn;
