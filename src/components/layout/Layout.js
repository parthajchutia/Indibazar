import React from 'react';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/footer'

function layout({children}) {       //layout component is use to state the constant components  //we use it by using props here children is a props which will change in time to time
  
  return (
    <div>
      <Navbar/>
        <div className='content'>
            {children}                 
        </div>
        <Footer/>
    </div>
  )
}

export default layout
