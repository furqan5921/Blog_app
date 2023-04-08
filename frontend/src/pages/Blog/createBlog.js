import Navbar from '@/components/Navbar'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, InputGroup, InputLeftElement, Stack, Text, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from "react-hot-toast";
import { MdOutlineTitle } from "react-icons/md"

import { useRouter } from 'next/router';
import GoBackButton from '@/components/GoBackButton';
const inittalData = {
    title: "",
    content: ""
}
const CreateBlog = () => {
    const router = useRouter()
    const [data, setData] = useState(inittalData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [token, setToken] = useState(null);



    useEffect(() => {

        if (typeof window !== 'undefined') {
            const token = JSON.parse(localStorage.getItem('Token')) || null;
            setToken(token);
        }
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target
        if (error && name === "content") {
            setError("")
        }
        setData({
            ...data,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError("")
        if (data.content.length < 100) {
            setError("Content must be 100 characters or more")
            setLoading(false)
            return
        }
        try {
            const config = {
                headers: { Authorization: `Bearer ${token?.token}` }
            };
            const res = await axios.post('http://localhost:8080/blog/createBlog', data, config)
            setLoading(false)
            setData(inittalData)
            toast.success("Blog created successfully")
        } catch (e) {
            setLoading(false)
            setError(e.message)
        }

    }
    return (
        <>
            <Navbar />
            <Box w={"90%"} m='auto'>
                <GoBackButton color={"rgb(83,76,135)"} bg={"whitesmoke"} />
                <Heading mt={"4rem"} textAlign={"center"} textDecoration={"underline"} color={"rgb(83,76,135)"}>Create Blog</Heading>
                <Flex gap={5} mt={"4rem"} flexDirection={["column", "column", "row", "row"]}  >
                    <Stack
                        w={["90%", "90%", "48%", "48%"]} m="auto">
                        <Image object-fit='contain' h={"100%"} src="https://cdn.pixabay.com/photo/2017/01/18/08/25/social-media-1989152_1280.jpg" bg={"whitesmoke"} w={"100%"} />
                    </Stack>
                    <Stack w={["90%", "90%", "48%", "48%"]} m="auto">
                        <form onSubmit={handleSubmit}>


                            <FormControl w={"100%"} color={"rgb(83,76,135)"} >
                                <FormLabel
                                    fontSize='2xl'
                                    lineHeight="tall"
                                    fontFamily="body"
                                    fontWeight="normal"
                                    pb={"0.5rem"}
                                >
                                    Title of the Blog
                                </FormLabel>
                                <InputGroup  >
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<MdOutlineTitle color="gray.300" />}
                                        fontSize={20}
                                    />
                                    <Input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        border={"1px solid black"}
                                        size='lg'
                                        value={data.title}
                                        onChange={handleChange}
                                        isDisabled={loading}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl w={"100%"} color={"rgb(83,76,135)"} >
                                <FormLabel
                                    fontSize='2xl'
                                    lineHeight="tall"
                                    fontFamily="body"
                                    fontWeight="normal"
                                    pb={"0.5rem"}
                                >
                                    Content of the Blog
                                </FormLabel>

                                <InputGroup  >

                                    <Textarea
                                        type="text"
                                        name="content"
                                        placeholder="Write Content with minimum 100 words "
                                        border={"1px solid black"}
                                        size='lg'
                                        resize={"vertical"}
                                        h={{ lg: '60' }}
                                        value={data.content}
                                        onChange={handleChange}
                                        isDisabled={loading}
                                    />
                                </InputGroup>
                                {error && <Text color={"red"} fontSize={'sm'}>{error}</Text>}
                            </FormControl>
                            <Box display={"flex"} justifyContent={"center"}>
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
                                    Submit
                                </Button>
                                <Toaster />
                            </Box>
                        </form>
                    </Stack>

                </Flex>
            </Box>
        </>
    )
}

export default CreateBlog