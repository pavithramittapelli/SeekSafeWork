import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import CardUpdated from './CardUpdated';
import { UserContext } from './userContext'
function Notifications() {
  const [work, setWork] = useState(null);
  const { userInfo, isLoading } = useContext(UserContext);
 
  useEffect(() => {
    if (!isLoading) {
      
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');
      fetch(`https://seek-safe-work.vercel.app/getnotificatoinpost/${id}/${userInfo.id}`).then(res => {
        res.json().then(data => {
          console.log(data);
          setWork(data);
        })
      })
      console.log(work);
    }

  }, [isLoading,userInfo]);

  return (
    <div>
      <Header />
      <div style={{marginTop:'90px'}}>

        {work && <CardUpdated cardData={[work]} />}
      
      </div>
    </div>
  )
}

export default Notifications



