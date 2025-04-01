import React from 'react';
import { Button, Result } from 'antd';
import { FrownOutlined } from '@ant-design/icons'; // Import biểu tượng "sad"
import { useNavigate } from 'react-router-dom';
import './PaymentFailure.scss';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-failure">
      <Result
        status="error"
        title={
            <span>
            Thanh toán thất bại! <FrownOutlined style={{ color: '#ff4d4f', fontSize: '30px' }} />
          </span>
        }
        subTitle="Rất tiếc, đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ."
        extra={[
          <Button
            type="primary"
            key="retry"
            // onClick={() => navigate('/payment')}
          >
            Thử lại
          </Button>,
          <Button
            key="home"
            onClick={() => navigate('/')}
          >
            Trở về trang chủ
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentFailure;