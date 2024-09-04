import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import styles from "./LoginPage.module.css";
import {request} from "../../util/request";
import { setAccessToken, setRefreshToken, setUser } from '../../util/sevice';
import { setIsLogin } from '../../util/sevice';

const LoginPage = () => {

  const [message, setMessage] = useState("")
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    var param = {
      Username: values.username,
      Password: values.password
    };
    

    // create function to fetch data from api
    const res = await request("/users/login","post",param); // to request from api
    if(res.message){
      setMessage(res.message);
      setUser(JSON.stringify(res.body)); // JSON.stringify is use for conver JSON(object) to JSON(Object String)
      setIsLogin("1");
      setAccessToken(res.access_token);
      setRefreshToken(res.refresh_token);
      window.location.href = "/home";
    }else if(res.error){
      if(res.error.Username){
        setMessage(res.error.Username); 
      }
      if(res.error.Password){
        setMessage(res.error.Password);
      }
      
    }
   
  };
  return (
  <div className={styles.loginContainer}>
    <h1 className={styles.h1}>Login : {message}</h1>
    <Form
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: 360,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="" htmlType="submit">
          Log in
        </Button>
        or <a href="">Register now!</a>
      </Form.Item>
    </Form>
  </div>
  );
};
export default LoginPage;