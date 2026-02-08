import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useStore();
  const [error, setError] = useState('');

  const onFinish = async (values: any) => {
    try {
      setError('');
      await login(values.email);
      message.success('登录成功');
      navigate('/');
    } catch (err) {
      setError('登录失败，请重试');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg" bordered={false}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Banner策略管理后台</h1>
          <p className="text-gray-500 mt-2">请登录以继续操作</p>
        </div>

        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}

        <Form
          name="login"
          initialValues={{ email: 'admin@example.com', password: 'password' }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="邮箱: admin@example.com" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="密码: 任意字符"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
          
          <div className="text-center text-gray-400 text-sm">
            演示账号: admin@example.com / operator@example.com
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
