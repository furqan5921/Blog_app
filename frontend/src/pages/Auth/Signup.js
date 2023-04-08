import React, { useState } from "react";


import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    Stack,
    Image,
    Select
} from "@chakra-ui/react";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";


const Signup = () => {
    const navigate = useRouter()
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "user"
    })
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            if (data.role == "user") {
                const res = await axios.post('http://localhost:8080/users/signup', data)
                setLoading(false)
                toast.success('User signed up successfully!', {
                    position: "top-center",
                    duration: 3000
                })
            } else {
                const res = await axios.post('http://localhost:8080/users/signupAuthor', data)
                setLoading(false)
                toast.success('Author signed up successfully!', {
                    position: "top-center",
                    duration: 3000
                })
            }
            navigate.push("/Auth/Login")
        } catch (e) {
            setLoading(false)
            console.log(e.message)
            toast.error(e.message);
        }
    }

    return (
        <Box
            minHeight="100vh"
            display="flex"
            flexDirection={["column", "column", "column", "row"]}
        >
            <Stack

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
                    <form onSubmit={handleSubmit}>
                        <FormControl >
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
                                placeholder="Enter your first name"
                                name="firstname"
                                onChange={handleChange}
                                value={data.firstname}
                                fontFamily="body"
                                isRequired
                                _placeholder={{ color: "gray.400" }}
                            />
                        </FormControl>
                        <FormControl >
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
                                placeholder="Enter your last name"
                                fontFamily="body"
                                _placeholder={{ color: "gray.400" }}
                                name="lastname"
                                onChange={handleChange}
                                value={data.lastname}
                                isRequired
                            />
                        </FormControl>
                        <FormControl >
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
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                isRequired
                            />
                        </FormControl>
                        <FormControl >
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
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                isRequired
                            />
                        </FormControl>
                        <FormControl >
                            <FormLabel
                                fontSize="sm"
                                lineHeight="tall"
                                fontFamily="body"
                                fontWeight="normal"
                                pb={"0.5rem"}
                            >
                                Password{" "}
                            </FormLabel>
                            <Select
                                type="password"
                                size="sm"
                                borderColor="gray.200"
                                focusBorderColor="purple.500"
                                text="sm"
                                lineHeight="tall"
                                name="role"
                                fontFamily="body"
                                _placeholder={{ color: "gray.400" }}
                                onChange={handleChange}
                                value={data.role}
                            >
                                <option value={'user'}>User</option>
                                <option value={'author'}>Author</option>
                            </Select>
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
                            isLoading={loading}
                            type="submit"
                        >
                            Signup
                        </Button>
                        <Toaster />
                    </form>
                </Stack>
            </Box>
        </Box>
    );
}


export default Signup