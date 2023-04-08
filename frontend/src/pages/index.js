import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import BlogMap from "@/components/BlogMap";

const Home = ({ data, totalPages, currentPages }) => {
  const [blogs, setBlogs] = useState(data)
  const [currentPage, setCurrentPage] = useState(currentPages);
  const [totalPage, setTotalPage] = useState(totalPages)
  const router = useRouter();
  const getData = async () => {
    const res = await axios.get(`http://localhost:8080/blog?page=${currentPage}&limit=10`);
    const data = res.data;
    setBlogs(data.data)
    setTotalPage(data.pagination.totalPages)
    setCurrentPage(data.pagination.currentPage)
  }
  const handleClick = async (page) => {
    const res = await axios.get(`http://localhost:8080/blog?page=${page}&limit=10`);
    const data = res.data;
    setCurrentPage(page);
    setBlogs(data.data);
  };


  return (
    <>
      <Navbar />
      <Box maxW="90%" mx="auto" p="4">
        <Heading color={"rgb(83,76,135)"} textAlign={'center'} mb="4">Blogs</Heading>
        <SimpleGrid columns={1} spacing="4" templateColumns={{ base: "1fr", md: "repeat(2,1fr)", lg: "repeat(3,1fr)" }}>
          {blogs.map((blog) => (
            <BlogMap {...blog} key={blog._id} renderData={getData} />
          ))}
        </SimpleGrid>
        <Box mt="4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              mx="1"
              bg={"rgb(83,76,135)"}
              colorScheme={currentPage === i + 1 ? "blue" : "gray"}
              onClick={() => handleClick(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { page = 1 } = query;
  const res = await axios.get(`http://localhost:8080/blog?page=${page}&limit=10`);
  const data = res.data;
  return {
    props: {
      data: data.data,
      totalPages: data.pagination.totalPages,
      currentPages: data.pagination.currentPage
    },
  };
};

export default Home;
