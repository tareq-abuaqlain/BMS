import {
  Col, Row,
  Button, Checkbox, Form, Input, Typography,
} from 'antd';
import React, { useState } from 'react';

import {
  LockOutlined, UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Login from '../../services/authService';
import { ILoginModel } from '../../Models/loginModel';
import { IErrorLoginResult } from '../../Models/ILoginResult';

const { Text, Title } = Typography;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onFinish = (values: ILoginModel) => {
    setErrorMessage('');
    Login(values)
      .then((res) => {
        const { role } = res.data;
        const isAdmin: boolean = role === 'admin';
        if (isAdmin) { navigate('/admin'); } else navigate('/user');
      })
      .catch((res: IErrorLoginResult) => {
        const { status } = res.response;
        const message: string = status === 400 ? 'يوجد خطأ في المدخلات' : 'حدث خطأ ما';
        setErrorMessage(message);
      });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="phoneNumber"
        rules={[{ required: true, message: 'حقل رقم الهاتف مطلوب' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="رقم الهاتف" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'حقل كلمة المرور مطلوب' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="كلمة المرور"
        />
      </Form.Item>
      <Text type="danger">{errorMessage}</Text>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>تذكرني</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/">
          نسيت كلمة المرور
        </a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          تسجيل الدخول
        </Button>
      </Form.Item>
    </Form>
  );
};

const colStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
};
const squareSpan = {
  width: '70px',
  height: '70px',
  backgroundColor: '#5138ec',
  borderRadius: '20px',
};
const App: React.FC = () => (
  <Row justify="space-between">
    <Col style={colStyle} xs={24} lg={12}>
      <div style={{ padding: '20px' }}>
        <div style={squareSpan} />
        <br />
        <Title>تسجيل الدخول</Title>
        <Title level={3}>تسجيل الدخول باستخدام اسم المستخدم وكلمة المرور الخاصة بك</Title>
        <br />
        <div>
          <LoginForm />
        </div>
      </div>
    </Col>
    <Col style={{ ...colStyle, backgroundColor: '#40a9ff' }} xs={24} lg={12} />
  </Row>
);

export default App;
