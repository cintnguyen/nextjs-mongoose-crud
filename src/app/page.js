// import Image from "next/image";
// import { useState, useEffect } from 'react';
// import RecipesList from './components/RecipesList'
import Home from './components/Home'

function ServerComponent({companyName}){
  return (
    <h1>{companyName}</h1>
  )
}

export default function App({companyName}) {
  return (
    <main>
      <ServerComponent companyName={companyName}/>
      <Home />
    </main>
  )
}

