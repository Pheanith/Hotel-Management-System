import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { Link } from 'react-router-dom';  // Import Link
import styles from "./LoginPage.module.css";
import { request } from "../../util/request";
import { setAccessToken, setRefreshToken, setUser, setIsLogin } from '../../util/sevice';

const LoginPage = () => {
  const [message, setMessage] = useState("");

  const onFinish = async (values) => {
   
    const param = {
      Username: values.username,
      Password: values.password,
    };

    // Fetch data from API
    const res = await request("/users/login", "post", param);

    if (res.message) {
      setMessage(res.message);
      setUser(JSON.stringify(res.body)); // Convert object to JSON string
      setIsLogin("1");
      setAccessToken(res.access_token);
      setRefreshToken(res.refresh_token);
      window.location.href = "/admin";
    } else if (res.error) {
      if (res.error.Username) {
        setMessage(res.error.Username);
      }
      if (res.error.Password) {
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
            {/* Use Link for navigation to the register page */}
            <Link to="/register">Forgot password?</Link>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <Link to="/register">Register now!</Link> {/* Use Link here */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
