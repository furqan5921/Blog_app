import React from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    Stack,
    Image
} from "@chakra-ui/react";
import Signin from "../../../public/assets/Signup.png";
import Link from "next/link";

const Signup = () => {
    return (
        <Box
            minHeight="100vh"
            display="flex"
            flexDirection={["column", "column", "column", "row"]}
        >
            <Stack
                // width={[1 / 2, 2 / 3, 2 / 3, 1 / 2]}
                justify="center"
                alignSelf="center"
                w={["100%", "100%", "50%", "50%"]}
            >
                <Image objectFit="cover" src={'https://www.shutterstock.com/image-vector/new-user-online-registration-sign-260nw-1982734163.jpg'} alt="Signup" />
            </Stack>
            <Box w={["100%", "100%", "100%", "50%"]}>
                <Stack
                    direction="row"
                    pl={16}
                    pr={16}
                    pt={8}
                    pb={10}
                    align="center"
                    justify="flex-end"
                >
                    <Text
                        fontSize="xs"
                        color="gray.400"
                        lineHeight="tall"
                        fontFamily="body"
                    >
                        Already have an account?
                    </Text>
                    <Link href={"/Auth/Login"}>

                        <Button
                            size="xs"
                            bg="white"
                            color="gray.500"
                            border="1px"
                            borderColor="gray.300"
                            borderRadius="full"
                            py={3}
                            px={4}
                            fontWeight="medium"
                            cursor="pointer"
                            _focus={{
                                outline: "none"
                            }}
                            _hover={{
                                bg: "white"
                            }}
                        >
                            SIGN IN
                        </Button>
                    </Link>
                </Stack>
                <Stack pl={16} pr={16} mb={10}>
                    <Text m={0} fontSize="3xl" fontWeight="bold" fontFamily="body">
                        Hello there!
                    </Text>
                    <Text
                        m={0}
                        fontSize="sm"
                        fontFamily="body"
                        color="gray.400"
                        lineHeight="tall"
                    >
                        Register your account
                    </Text>
                </Stack>
                <Stack pl={16} pr={24} spacing={6}>
                    <FormControl id="name">
                        <FormLabel
                            fontSize="sm"
                            lineHeight="tall"
                            fontFamily="body"
                            fontWeight="normal"
                            pb={"0.5rem"}
                        >
                            First Name
                        </FormLabel>
                        <Input
                            type="text"
                            size="sm"
                            borderColor="gray.200"
                            focusBorderColor="purple.500"
                            text="sm"
                            lineHeight="tall"
                            placeholder="Apoorva Sharma"
                            fontFamily="body"
                            _placeholder={{ color: "gray.400" }}
                        />
                    </FormControl>
                    <FormControl id="name">
                        <FormLabel
                            fontSize="sm"
                            lineHeight="tall"
                            fontFamily="body"
                            fontWeight="normal"
                            pb={"0.5rem"}
                        >
                            Last Name
                        </FormLabel>
                        <Input
                            type="text"
                            size="sm"
                            borderColor="gray.200"
                            focusBorderColor="purple.500"
                            text="sm"
                            lineHeight="tall"
                            placeholder="Apoorva Sharma"
                            fontFamily="body"
                            _placeholder={{ color: "gray.400" }}
                        />
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel
                            fontSize="sm"
                            lineHeight="tall"
                            fontFamily="body"
                            fontWeight="normal"
                            pb={"0.5rem"}
                        >
                            Email{" "}
                        </FormLabel>
                        <Input
                            type="email"
                            size="sm"
                            borderColor="gray.200"
                            focusBorderColor="purple.500"
                            text="sm"
                            lineHeight="tall"
                            placeholder="apoorvas@gmail.com"
                            fontFamily="body"
                            _placeholder={{ color: "gray.400" }}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel
                            fontSize="sm"
                            lineHeight="tall"
                            fontFamily="body"
                            fontWeight="normal"
                            pb={"0.5rem"}
                        >
                            Password{" "}
                        </FormLabel>
                        <Input
                            type="password"
                            size="sm"
                            borderColor="gray.200"
                            focusBorderColor="purple.500"
                            text="sm"
                            lineHeight="tall"
                            placeholder="8+ characters"
                            fontFamily="body"
                            _placeholder={{ color: "gray.400" }}
                        />
                    </FormControl>
                    <Button
                        my={3}
                        size="md"
                        w={170}
                        h={45}
                        borderRadius="40px"
                        bg="purple.500"
                        color="white"
                        border="0"
                        fontWeight="400"
                        fontFamily="body"
                        fontSize="sm"
                        cursor="pointer"
                        _focus={{
                            outline: "none"
                        }}
                        _hover={{
                            bg: "purple.500"
                        }}
                        boxShadow="lg"
                    >
                        Signup
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}


export default Signup