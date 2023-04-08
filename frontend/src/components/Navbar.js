import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import jwt_decode from "jwt-decode";

import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const router = useRouter()
    const [token, setToken] = useState(null);
    console.log("🚀 ~ file: Navbar.js:11 ~ Navbar ~ token:", token)



    useEffect(() => {

        if (typeof window !== 'undefined') {
            const token = JSON.parse(localStorage.getItem('Token')) || null;
            setToken(token);
        }
    }, []);
    const handleClick = () => {
        if (token) {
            localStorage.removeItem('Token');
            router.push('/Auth/Login')
        }
        else {
            router.push('/Auth/Login')
        }
    }

    return (
        <Flex justifyContent={'space-between'} align={'center'} bg={'rgb(83,76,135)'}>
            <Box >
                <Link href={'/'} >
                    <Heading color={'whitesmoke'} textDecoration={'underline'} p={'1rem'}>BlogApp</Heading>
                </Link>
            </Box>
            <Flex w={'100%'} justifyContent={'space-evenly'}>
                <Box>
                    <Link href={'/'}>
                        <Button size={'lg'} color='whitesmoke' variant={'link'}  >
                            Blogs
                        </Button>
                    </Link>
                </Box>
                <Box display={token?.role == "author" ? "block" : "none"}>
                    <Link href={'/Blog/createBlog'}>
                        <Button size={'lg'} color='whitesmoke' variant={'link'}>
                            Create Blogs
                        </Button>
                    </Link>
                </Box>
                <Box >
                    <Button onClick={handleClick} size={'lg'} color='whitesmoke' variant={'link'}  >
                        {token ? "Logout" : "Login"}
                    </Button>
                </Box>

            </Flex>
        </Flex>

    )
}

export default Navbar