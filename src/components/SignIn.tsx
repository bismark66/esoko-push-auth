import React from 'react';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import type { FormProps } from 'antd';

type FieldType = {
  email?: string;
  password?: string;
};

interface SignInProps {
  onFinish: FormProps<FieldType>['onFinish'];
  onFinishFailed: FormProps<FieldType>['onFinishFailed'];
  onSignUpClick: () => void;
  loading?: boolean;
}

const SignIn: React.FC<SignInProps> = ({ onFinish, onFinishFailed, onSignUpClick, loading }) => {
  return (
    <>
      <Image src="/esoko_logo.png" alt="logo" width={200} height={150} />
      <p style={{fontSize: '0.8rem', marginBottom: '2rem',color:'#000' }}>Welcome back</p>

      <Form
        name="signin"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: 'Please input your email address!' },
            { type: 'email', message: 'Please enter a valid email address!' }
          ]}
        >
          <Input style={{width: '100%', height: '45px'}} placeholder="Enter your email address" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password style={{width: '100%', height: '45px'}} placeholder="Enter your password" />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" style={{width: '100%', height: '45px'}} loading={loading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
        <span style={{color: '#666'}}>Don't have an account? <a onClick={onSignUpClick} style={{color: '#0d3b77', textDecoration: 'none', cursor: 'pointer'}}>Sign up</a></span>
      </div>
    </>
  );
};

export default SignIn; 