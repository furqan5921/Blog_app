import { Box, Button, Heading, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'

import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import EditModal from './EditModal'

const BlogMap = ({ _id, content, title, author, comments, renderData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const [token, setToken] = useState(null);

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token?.token}` }
            };
            const res = await axios.delete(`http://localhost:8080/blog/${id}`, config)
            renderData();

        } catch (e) {
            console.log(e.message)
        }
    }


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = JSON.parse(localStorage.getItem('Token')) || null;
            setToken(token);
        }

    }, []);


    return (
        <Box bg={'rgb(83,76,135)'} color={"whitesmoke"} display={'flex'} flexDirection={"column"} key={_id} p="4" shadow="md" borderWidth="1px">
            <Heading size='xl' textDecoration={'underline'}>{title}</Heading>
            <Box mt="2" fontSize="sm" >
                <Text fontSize={"xl"}>{content.substring(0, 100)}...</Text>
            </Box>
            <Button mt="4" _hover={{
                textDecoration: "underline"
            }} colorScheme="rgb(83,76,135)" onClick={() => router.push(`/Blog/${_id}`)}>
                Read More
            </Button>
            <Box mt="2" display={token?.role === "admin" || author === token?.id ? 'flex' : "none"} justifyContent={'center'} >
                <Button
                    _hover={{
                        textDecoration: "underline"
                    }} colorScheme="rgb(83,76,135)"
                    onClick={onOpen}
                    onOpen>Update Blog</Button>
                <Button
                    _hover={{
                        textDecoration: "underline"
                    }}
                    colorScheme="rgb(83,76,135)"
                    onClick={() => handleDelete(_id)}
                >Delete Blog</Button>
                <EditModal isOpen={isOpen} onClose={onClose} content={content} title={title} id={_id} renderData={renderData} token={token?.token} />
            </Box>
            <Box display={comments.length > 0 ? "flex" : "none"} >
                <Link href={`/comments/${_id}`}>
                    <Button _hover={{
                        textDecoration: "underline"
                    }} colorScheme="rgb(83,76,135)">View all {comments.length} {comments.length > 1 ? "comments" : "comment"}</Button>
                </Link>
            </Box>
        </Box>
    )
}

export default BlogMap