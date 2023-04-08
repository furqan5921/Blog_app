import GoBackButton from '@/components/GoBackButton'
import { Box, Heading, Text } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'

const BlogSinglePage = ({ data }) => {
    console.log("🚀 ~ file: [id].js:4 ~ BlogSinglePage ~ data:", data)
    const { title, content } = data
    return (
        <Box bg={'rgb(83,76,135)'} h={"100vh"}  position={"absolute"} top="0px" w="100%">
            <GoBackButton color={"whitesmoke"} bg={"rgb(83,76,135)"}  />
            <Box mx={"5rem"} mt={"4rem"} color={'whitesmoke'} >
                <Heading textDecoration={'underline'} size={"4xl"} >Title : {title}</Heading>
                <Text fontSize={'3xl'} mt={"4rem"} >Blog : {content}</Text>
            </Box>
        </Box>
    )
}

export default BlogSinglePage

export const getServerSideProps = async ({ query }) => {
    const { id } = query;
    const res = await axios.get(`http://localhost:8080/blog/${id}`);
    const data = res.data;
    return {
        props: {
            data

        },
    };
};