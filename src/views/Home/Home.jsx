import React from 'react'
function Home() {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="">
      <h1>Home</h1>
    </div>
  )
}

export default Home
