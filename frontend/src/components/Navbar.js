import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <Flex justifyContent={'space-between'} align={'center'} bg={'rgb(83,76,135)'}>
            <Box>
                <Link href={'/'}>
                    <Heading color={'whitesmoke'} p={'1rem'}>BlogApp</Heading>
                </Link>
            </Box>
            <Flex w={'48%'} justifyContent={'space-evenly'}>
                <Link href={'/'}>
                    <Button size={'lg'} color='whitesmoke' variant={'link'}  >
                        Blogs
                    </Button>
                </Link>
                <Link href={'/Blog/createBlog'}>
                    <Button size={'lg'} color='whitesmoke' variant={'link'}>
                        Create Blogs
                    </Button>
                </Link>
            </Flex>
        </Flex>

    )
}

export default Navbar