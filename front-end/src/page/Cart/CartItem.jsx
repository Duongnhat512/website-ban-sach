import { List, Checkbox, InputNumber, Typography, Button, Image, Empty, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const CartItem = ({ item, onQuantityChange, onSelect }) => {
  const totalPrice = item.price * item.quantity;

  return (
    // <List.Item actions={[<Button icon={<DeleteOutlined />} type="text" danger />]}>
    //   <Checkbox checked={item.selected} onChange={() => onSelect(item.id)} />
    //   <Image width={80} src={item.imageUrl} alt="Product Image" />
    //   <div style={{ flex: 1, marginLeft: 16 }}>
    //     <Text strong>{item.name}</Text>
    //     <br />
    //     <Text type="secondary" style={{ fontSize: 12 }}>{item.releaseDate}</Text>
    //     <br />
    //     <Text delete>{(item.price * 1.11).toLocaleString()} đ</Text> <br />
    //     <Text strong style={{ color: "red" }}>{item.price.toLocaleString()} đ</Text>
    //   </div>
    //   <InputNumber
    //     min={1}
    //     value={item.quantity}
    //     onChange={(value) => onQuantityChange(item.id, value)}
    //   />
    //   <Text strong style={{ color: "red", marginLeft: 16 }}>
    //     {totalPrice.toLocaleString()} đ
    //   </Text>
    // </List.Item>
    <></>
  );
};

export default CartItem;