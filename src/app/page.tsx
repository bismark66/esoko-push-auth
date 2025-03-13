'use client'
import React, { useState } from 'react';
import { Col, Row, message } from 'antd';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import type { FormProps } from 'antd';
import { useRouter } from 'next/navigation';

type SignInFieldType = {
  email?: string;
  password?: string;
};

type SignUpFieldType = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
};

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignInFinish: FormProps<SignInFieldType>['onFinish'] = async (values) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      
      
      localStorage.setItem('auth_token', data.token);
      
      message.success('Successfully signed in!');
      
      // Redirect to your web app
      router.push('/dashboard'); 
    } catch (error) {
      message.error('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const onSignUpFinish: FormProps<SignUpFieldType>['onFinish'] = async (values) => {
    try {
      setLoading(true);
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      
      localStorage.setItem('auth_token', data.token);
      
      message.success('Account created successfully!');
      
      // Redirect to your web app
      router.push('/dashboard'); // Replace with your app's dashboard URL
    } catch (error) {
      message.error('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Please check your input and try again.');
  };

  
  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      router.push('/dashboard'); 
    }
  }, [router]);

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#fff' }}>
      <Col 
        xs={0} 
        sm={0} 
        md={14} 
        style={{
          backgroundColor: '#0d3b77', 
          height: '100vh',
          clipPath: "polygon(0 0, 80% 0%, 100% 100%, 0% 100%)",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Row justify="center" align="middle" style={{ height: '100%'}}>
          <Col span={12}>
            <img src="/esoko_push.png" alt="logo" style={{ maxWidth: '100%' }} />
          </Col>

          <Col span={24} style={{textAlign: 'center',color: 'white'}} >
          <Row justify="center" align="middle">
            <Col span={16}>
            <h2 style={{fontSize: '2.0rem', marginBottom: '1rem', fontWeight: 200}}>Connect with your users globally through reliable, scalable communication APIs</h2>
            <h2 style={{fontSize: '1.0rem', lineHeight: '1.6', opacity: 0.9, fontWeight: 600}}>COMMUNITY MESSAGING PLATFORM</h2>
            </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col 
        xs={24} 
        sm={24} 
        md={10} 
        style={{ 
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Row justify="center" align="middle" style={{ width: '100%' }}>
          <Col xs={24} sm={20} md={10} style={{textAlign: 'left'}}>
            {isSignIn ? (
              <SignIn 
                onFinish={onSignInFinish}
                onFinishFailed={onFinishFailed}
                onSignUpClick={() => setIsSignIn(false)}
                loading={loading}
              />
            ) : (
              <SignUp 
                onFinish={onSignUpFinish}
                onFinishFailed={onFinishFailed}
                onSignInClick={() => setIsSignIn(true)}
                loading={loading}
              />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
