import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { callGetTotalCategories, callGetTotalOrder, callGetTotalProduct, callGetTotalUser } from "../../service/AdminService";
function AdminMain() {
  const [countValue, setCountValue] = useState({
    totalCategory: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalUser: 0,
  });
  const formatter = (value) => <CountUp end={value} separator="," />;
  const getValue = async () => {
    let resCate = await callGetTotalCategories();
    let resOrder = await callGetTotalOrder();
    let resProduct = await callGetTotalProduct();
    let resUser = await callGetTotalUser();
    if (resCate && resCate.code === 200) {
      setCountValue((prev) => ({
        ...prev,
        totalCategory: resCate.result,
      }));
    }
    if (resOrder && resOrder.code === 200) {
      setCountValue((prev) => ({
        ...prev,
        totalOrder: resOrder.result,
      }));
    }
    if (resProduct && resProduct.code === 200) {
      setCountValue((prev) => ({
        ...prev,
        totalProduct: resProduct.result,
      }));
    }
    if (resUser && resUser.code === 200) {
      setCountValue((prev) => ({
        ...prev,
        totalUser: resUser.result,
      }));
    }
  };
  useEffect(() => {
   getValue();
  }, []);

  return (
    <div className="site-card-wrapper">
      <Row gutter={[16,16]}>
        <Col span={12}>
          <Card title="Total User " bordered={false}style={{ backgroundColor: '#ff7f7f' }}>
            <Statistic
              value={countValue.totalUser}
              precision={5}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Total Product " bordered={false} style={{ backgroundColor: '#7fff7f' }}>
          <Statistic
              value={countValue.totalProduct}
              precision={5}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Total Order " bordered={false} style={{ backgroundColor: '#7f7fff' }}>
          <Statistic
              value={countValue.totalOrder}
              precision={5}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Total Category" bordered={false} style={{ backgroundColor: '#ff7fff' }}>
          <Statistic
              value={countValue.totalCategory}
              precision={5}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminMain;
