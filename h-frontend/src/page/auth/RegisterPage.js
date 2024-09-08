import React, { useState } from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import styles from "./Register.module.css";
import { request } from "../../util/request";

const RegisterPage = () => {
  const [message, setMessage] = useState("");

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const param = {
      Username: values.username,
      Email: values.email,
      Password: values.password,
    };

    // Fetch data from API
    const res = await request("/users/register", "post", param);

    if (res.message) {
      setMessage(res.message);
      window.location.href = "/login";  // Redirect to login page after successful registration
    } else if (res.error) {
      if (res.error.Username) {
        setMessage(res.error.Username);
      }
      if (res.error.Email) {
        setMessage(res.error.Email);
      }
      if (res.error.Password) {
        setMessage(res.error.Password);
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.h1}>Register : {message}</h1>
      <Form
        name="register"
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
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input a valid Email!',
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
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
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your Password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
          or <Link to="/login">Login now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
