import React, { useState } from 'react';
import './index.css';
import {
  LockOutlined,
  UserOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-facebook-login';

import { Button, Form, Input } from 'antd';
import './App.css';

const App = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const handleSubmit = async (event) => {
    if (email === 'admin123@gmail.com' && password === '123456789') {
      props.history.push('/dashboard');
      localStorage.setItem('token', 'admin123@gmail.com');
    } else {
      alert('No user profile found LogIn Now');
    }
    event.preventDefault();
  };
  const handleGoogleLogin = async () => {
    props.history.push('/dashboard');
  };
  const onFieldEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onFieldPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const responseFacebook = (response) => {
    console.log('response: ', response);
    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
      props.history.push('/dashboard');
      // window.location('/dashboard');
    } else {
      alert(' User is not logged in please Login');
    }
  };
  return (
    <>
      <h1>Login Form</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="Email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            value={email}
            type="email"
            onChange={onFieldEmailChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={onFieldPasswordChange}
            value={password}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleSubmit}
            style={{
              width: 200,
              height: '50px',
            }}
          >
            Log in
          </Button>

          <FacebookLogin
            style={{
              margin: '10px',
            }}
            appId="801413908108712"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <Button
                type="primary"
                icon={<FacebookOutlined />}
                onClick={renderProps.onClick}
                style={{
                  width: '200px',
                  height: '50px',
                  margin: '20px',
                }}
              >
                Login With Facebook
              </Button>
            )}
          />
          <GoogleLogin
            style={{
              margin: '10px',
            }}
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Login With Google"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <Button
                type="primary"
                icon={<GoogleOutlined />}
                onClick={renderProps.onClick}
                style={{
                  width: '200px',
                  height: '50px',
                  margin: '20px',
                }}
              >
                Login With Google
              </Button>
            )}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
