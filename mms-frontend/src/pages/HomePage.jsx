import React from "react";
import {Link} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import liff from "@line/liff"

const HomePage = () => {

  const [profile,setProfile]= React.useState(null);

  const getProfile= async () =>{
    await liff.init({liffId: import.meta.env.VITE_LIFF_ID});
    if(liff.isLoggedIn()){
      const userProfile = await liff.getProfile();
      setProfile({
        userId: userProfile.userId,
        displayName: userProfile.displayName,
        pictureUrl: userProfile.pictureUrl
      })
    }else{
      liff.login();
      await liff.init({liffId: import.meta.env.VITE_LIFF_ID});
    }
  }

  React.useEffect(()=>{
    getProfile();
  },[]);

  return (
    <>
    <div className="container text-center my-5">
      <div>
      <h1>หน้าหลัก</h1>
      {
        profile && (
          <>
          <div>
            <img src={profile.pictureUrl} width="40" />
            <p>ยินดีต้อนรับคุณ {profile.displayName}</p>
            <p>userId: {profile.userId}</p>
            <p>LIFF ID : {import.meta.env.VITE_LIFF_ID}</p>
          </div>
          </>
        )
      }
    <Link to ="/updateprofile" className="btn btn-primary btn-lg">แก้ไขข้อมูลส่วนตัว</Link>
      </div>
    </div>
    
    </>

  )
}
export default HomePage