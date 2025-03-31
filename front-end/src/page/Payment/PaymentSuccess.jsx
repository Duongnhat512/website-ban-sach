import React from 'react';
import { Button, Result } from 'antd';
import './PaymentSuccess.scss';
import { useNavigate } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success">
      <Result
        status="success"
        title={
            <span>
              Thanh toán thành công! <SmileOutlined style={{ color: '#3b950e', fontSize: '30px' }} />
            </span>
          }
        subTitle="Cảm ơn bạn đã đặt hàng tại Fahasa.com. Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất."
        extra={[
          <Button
            type="primary"
            key="home"
            onClick={() => navigate('/')}
          >
            Tiếp tục mua sắm
          </Button>,
          <Button
            key="order"
            // onClick={() => navigate('/orders')}
          >
            Xem đơn hàng
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;