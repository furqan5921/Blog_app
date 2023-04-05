
import { Inter } from 'next/font/google'
import axios from 'axios';
import Navbar from '@/components/Navbar'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data, totalPages, currentPage }) {
  const [mapData, setMapData] = useState(data)
 

  return (
    <>
      <Navbar />

    </>
  )
}


export const getServerSideProps = async ({ query }) => {
  const { page = 1, limit = 10 } = query;
  const res = await axios.get(`http://localhost:8080/blog?page=${page}&limit=${limit}`);
  const data = res.data;

  return {
    props: {
      data:data.data,
      totalPages: data.pagination.totalPages,
      currentPage: data.pagination.currentPage
    },
  };
};