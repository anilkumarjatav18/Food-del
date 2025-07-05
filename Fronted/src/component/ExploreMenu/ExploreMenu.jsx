import React from 'react'
import './Explore.css'
import {menu_list} from '../../assets/assets.js' 

function ExploreMenu({category,setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu</h1>
        <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum recusandae voluptatibus unde!</p>
        <div className="explore-menu-list">
            {menu_list.map((ite,index)=>{
                 return (
                     <div onClick={()=> setCategory(prev => prev===ite.menu_name ?"All":ite. menu_name)}  key={index}       className='explore-menu-list-item'>
                        <img  className= { category === ite.menu_name ?"click":""}src={ite.menu_image} alt="" />
                        <p>{ite.menu_name} </p>
                    </div> ) })}
                 
            
        </div>
      
    </div>
  )
}

export default ExploreMenu
