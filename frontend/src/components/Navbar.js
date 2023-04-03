import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <Flex justifyContent={'space-between'}>
            <Box w={'48%'}>
                <Link href={'/'}>
                    <Heading>BlogApp</Heading>
                </Link>
            </Box>
            <Flex w={'48%'} justifyContent={'space-evenly'}>
                <Link href={'/'}>
                    <Button variant={'link'}>
                        Blogs
                    </Button>
                </Link>
                <Link href={'/Blog/createBlog'}>
                    <Button variant={'link'}>
                        Create Blogs
                    </Button>
                </Link>
            </Flex>
        </Flex>

    )
}

export default Navbar