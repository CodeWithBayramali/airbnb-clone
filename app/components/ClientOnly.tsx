'use client';

import React,{ReactNode, useEffect} from "react"

interface ClientOnlyProps {
    children:ReactNode
}

const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMounted,setHasMounted] = React.useState(false)

    useEffect(() => {
      setHasMounted(true)
    }, [])

    if(!hasMounted){
        return null;
    }
    

  return (
    <>
        {children}
    </>
  )
}

export default ClientOnly