import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'

function Home() {
  return (
    <>
    <div className='container my-3'>
      <h2 className='text-center'>Add a Note</h2>
      <AddNote />
      
      <h2 className='text-center my-3'>Your Notes</h2>
      <Notes />
    </div>



    </>
  )
}

export default Home
