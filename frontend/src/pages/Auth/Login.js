import {
    Avatar,
    Box,
    Button,
    Flex,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Stack,
    chakra
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaLock, FaUserAlt } from "react-icons/fa";



const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await axios.post('http://localhost:8080/users/login', data)
            setLoading(false)
            const { token, refreshToken, firstname, lastname, role } = res.data
            localStorage.setItem('Token', JSON.stringify({ token, refreshToken, firstname, lastname, role }))
            toast.success('User signed in successfully!', {
                duration: 4000,
                position: 'top-center',
            })
            router.push('/')
        } catch (e) {
            setLoading(false)
            console.log(e.message)
        }
    }
    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >

            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Welcome</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input
                                        type="email"
                                        value={data.email}
                                        name="email"
                                        placeholder="email address"
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                        value={data.password}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                                isLoading={loading}
                            >
                                Login
                            </Button>
                            <Toaster />

                        </Stack>

                    </form>

                </Box>
            </Stack>
            <Box>
                New to us?{" "}
                <Link href={"/Auth/Signup"}>
                    <span style={{
                        color: "gray"
                    }}>
                        Signup
                    </span>
                </Link>
            </Box>
        </Flex>
    );
};

export default Login;
