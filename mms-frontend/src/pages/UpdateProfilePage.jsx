import React from "react";
import {Link} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import liff from "@line/liff"

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object} from "yup"
import "yup-phone"

import axios from "axios"
import { useNavigate } from "react-router-dom";

const schema = object().shape({
  user_phone: string().phone("TH",null, "เบอร์โทรไม่ถูกต้อง กรุณาป้อนข้อมูลใหม่อีกครั้ง")
});

const UpdateProfilePage = () => {
  const navigate = useNavigate();

 
  const { register, handleSubmit, setValue, formState:{ errors } } = useForm({
      resolver: yupResolver(schema)
    });

  const onSubmit = async data => {
  //    console.log(data)
    const userProfile = await liff.getProfile();
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/update/${userProfile.userId}` ,
    {
      displayName: userProfile.displayName,
      pictureUrl: userProfile.pictureUrl,
      userPhone: data.user_phone
    })
      alert(response.data.message)
      navigate("/")
  };

  const getPhoneNumber= async ()=>{
    const userProfile = await liff.getProfile();
    //const response = await axios.get(`${import.meta.env.BACKEND_DOMAIN}/user/getuserphonenumber/${userProfile.userId}`)
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getuserphonenumber/${userProfile.userId}`)
    //console.log(response.data)
    setValue("user_phone", response.data.user_phone)
  }

  React.useEffect(()=>{
    getPhoneNumber();
  },[])


  return (
    <>
   <div className="container mt-5">
    <div className="row d-flex justify-content-center">
      <div className="col-md-4">
      <h1>แก้ไขข้อมูลส่วนตัว</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Group className="mb-3" controlId="formUserPhone">
          <Form.Label>เบอร์โทรศัพท์</Form.Label>
          <Form.Control {...register("user_phone")} type="text" placeholder="Enter Phone" />
        {
          errors.user_phone && (
            <p style={{color:'red'}}> {errors.user_phone.message} </p>
          )
        }
        </Form.Group>
    
        <Button variant="primary" type="submit">
          บันทึกข้อมูล
        </Button>
       </Form>
      <hr />
    <Link to ="/" className="mt-3 btn btn-success">หน้าหลัก</Link>

      </div>
    </div>
   </div>
    </>
  )
}

export default UpdateProfilePage;