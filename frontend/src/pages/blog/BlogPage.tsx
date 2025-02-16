import React from 'react'
import { Outlet } from 'react-router'
import Header from '../../component/Header'

const Blog = () => {
  return (
  <>
  <p>blogs</p>
  <Outlet/>
  </>

  )
}

export default Blog