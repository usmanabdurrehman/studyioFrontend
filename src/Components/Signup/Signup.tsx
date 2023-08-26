import { useSignup } from "../../mutations";
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

interface SignupProps {
  onSuccess: () => void;
}

const Signup = memo(({ onSuccess }: SignupProps) => {
  const initialValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }),
    []
  );

  const { mutateAsync: signup } = useSignup();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await signup(values);
        onSuccess();
      }}
    >
      {({ submitForm }) => {
        return (
          <Flex height="100vh" gap={6}>
            <Flex flex="1" alignItems={"center"}>
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
                  Sign up
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
            <Box
              flex="3"
              bg={
                'url("https://media.istockphoto.com/id/1321462048/photo/digital-transformation-concept-system-engineering-binary-code-programming.jpg?s=612x612&w=0&k=20&c=Ib8RLw3_eCOo9N3YE4pvp9rcb_WmirjS-9x9R-vTd68=")'
              }
              backgroundSize="cover"
            />
          </Flex>
        );
      }}
    </Formik>
  );
});

export default Signup;
