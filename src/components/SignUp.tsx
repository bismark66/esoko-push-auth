import React from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import Image from 'next/image';
import type { FormProps } from 'antd';
import { countries } from '@/data/countries';

type FieldType = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
};

interface SignUpProps {
  onFinish: FormProps<FieldType>['onFinish'];
  onFinishFailed: FormProps<FieldType>['onFinishFailed'];
  onSignInClick: () => void;
  loading?: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ onFinish, onFinishFailed, onSignInClick, loading }) => {
  return (
    <>
      <Image src="/esoko_logo.png" alt="logo" width={200} height={150} />
      <p style={{fontSize: '0.8rem', marginBottom: '2rem',color:'#000' }}>Create your account</p>

      <Form
        name="signup"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input style={{width: '100%', height: '45px'}} placeholder="Enter your first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input style={{width: '100%', height: '45px'}} placeholder="Enter your last name" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^\+?[1-9]\d{1,14}$/, message: 'Please enter a valid phone number!' }
          ]}
        >
          <Input style={{width: '100%', height: '45px'}} placeholder="Enter your phone number" />
        </Form.Item>

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
          label="Country"
          name="country"
          rules={[{ required: true, message: 'Please select your country!' }]}
        >
          <Select
            style={{width: '100%', height: '45px'}}
            placeholder="Select your country"
            options={countries}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Password must be at least 8 characters!' }
              ]}
            >
              <Input.Password style={{width: '100%', height: '45px'}} placeholder="Enter your password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password style={{width: '100%', height: '45px'}} placeholder="Confirm your password" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" style={{width: '100%', height: '45px'}} loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
        <span style={{color: '#666'}}>Already have an account? <a onClick={onSignInClick} style={{color: '#0d3b77', textDecoration: 'none', cursor: 'pointer'}}>Sign in</a></span>
      </div>
    </>
  );
};

export default SignUp; 