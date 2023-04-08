import { Button, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { Toaster, toast } from "react-hot-toast";
const EditModal = ({ isOpen, onClose, title, content, id, renderData, token }) => {

    const intialValue = {
        title,
        content
    }
    const [data, setData] = useState(intialValue)
    const handleChange = (e) => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        console.log("coming here")
        const { title, content } = data

        if (content.length < 100) {
            toast.error("Content length must be greater than 100 characters")
            return
        }
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const res = await axios.put(`http://localhost:8080/blog/${id}`, data, config)
            renderData();
            onClose()
            toast.success("Blog updated successfully")
        } catch (e) {
            toast.error(e.message)
        }



    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Blog</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack direction={"column"}>
                        <Input w={"90%"} type='text' onChange={handleChange} value={data.title} name='title' placeholder='Update Title' />
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
                        />
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost' onClick={handleSubmit}>Confirm updates</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditModal