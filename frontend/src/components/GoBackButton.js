import { Box, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai"
const GoBackButton = ({ color, bg }) => {
    const router = useRouter()
    return (
        <Box mt={"1rem"}>
            <Button onClick={() => router.back()} variant={"ghost"} colorScheme={bg} color={color} leftIcon={<AiOutlineArrowLeft />}>
                Go Back
            </Button>
        </Box>
    )
}

export default GoBackButton