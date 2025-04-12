import {
  Drawer,
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  message,
  Row,
  Col,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { callGetAllCate } from "../../../service/AdminService";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
const DrawerCreateBook = ({ visible, onClose, onCreate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const bookData = {
      title: values.title,
      description: values.description,
      author: values.author,
      originalPrice: values.originalPrice,
      currentPrice: values.currentPrice,
      releasedDate: values.releasedDate.format("YYYY-MM-DD"),
      quantity: values.quantity,
      discount: values.discount,
      publisher: values.publisher,
      pages: values.pages,
      categoryId: values.categoryId,
    };

    setLoading(true);
    await onCreate(bookData, values.thumbnail[0].originFileObj);
    form.resetFields();
    onClose();
    setLoading(false);
  };
  useEffect(() => {
    if (visible) {
      fetchCategories();
    }
  }, [visible]);
  const fetchCategories = async () => {
    try {
      const res = await callGetAllCate();
      console.log(res);

      if (res && res.code === 200) {
        setCategories(res.result.result);
      } else {
        message.error("Lấy danh mục thất bại!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi lấy danh mục!");
    }
  };
  return (
    <Drawer
      title="Thêm Sách Mới"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Tên Sách"
              rules={[
                { required: true, message: "Tên sách không được để trống!" },
                {
                  max: 100,
                  message: "Tên sách không được vượt quá 100 ký tự!",
                },
              ]}
            >
              <Input placeholder="Nhập tên sách" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="author"
              label="Tác Giả"
              rules={[
                { required: true, message: "Tác giả không được để trống!" },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: "Tác giả chỉ được chứa chữ cái và khoảng trắng!",
                },
              ]}
            >
              <Input placeholder="Nhập tên tác giả" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="originalPrice"
              label="Giá Gốc (VND)"
              rules={[
                { required: true, message: "Giá gốc không được để trống!" },
                {
                  type: "number",
                  min: 0,
                  message: "Giá gốc phải là số dương!",
                },
              ]}
            >
              <InputNumber
                placeholder="Nhập giá gốc"
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="currentPrice"
              label="Giá Hiện Tại (VND)"
              rules={[
                {
                  required: true,
                  message: "Giá hiện tại không được để trống!",
                },
                {
                  type: "number",
                  min: 0,
                  message: "Giá hiện tại phải là số dương!",
                },
              ]}
            >
              <InputNumber
                placeholder="Nhập giá hiện tại"
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="releasedDate"
              label="Ngày Phát Hành"
              rules={[
                {
                  required: true,
                  message: "Ngày phát hành không được để trống!",
                },
              ]}
            >
              <DatePicker
                placeholder="Chọn ngày phát hành"
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current && current > moment().endOf("day")
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Số Lượng"
              rules={[
                { required: true, message: "Số lượng không được để trống!" },
                { type: "number", min: 1, message: "Số lượng phải lớn hơn 0!" },
              ]}
            >
              <InputNumber
                placeholder="Nhập số lượng"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="thumbnail"
              label="Hình Ảnh"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[
                { required: true, message: "Hình ảnh không được để trống!" },
                {
                  validator: (_, value) => {
                    if (!value || value.length === 0) {
                      return Promise.reject("Vui lòng tải lên một file ảnh!");
                    }
                    const isImage = value[0]?.type.startsWith("image/");
                    if (!isImage) {
                      return Promise.reject(
                        "File phải là hình ảnh (jpg, png, ...)"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false} // Ngăn không cho upload tự động
              >
                <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="discount"
              label="Giảm Giá (%)"
              rules={[
                { required: true, message: "Giảm giá không được để trống!" },
                {
                  type: "number",
                  min: 0,
                  max: 1,
                  message: "Giảm giá phải nằm trong khoảng 0 - 1!",
                },
              ]}
            >
              <InputNumber
                placeholder="Nhập giảm giá (0.25 = 25%)"
                style={{ width: "100%" }}
                step={0.01}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="publisher"
              label="Nhà Xuất Bản"
              rules={[
                {
                  required: true,
                  message: "Nhà xuất bản không được để trống!",
                },
                {
                  max: 100,
                  message: "Tên nhà xuất bản không được vượt quá 100 ký tự!",
                },
              ]}
            >
              <Input placeholder="Nhập tên nhà xuất bản" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="pages"
              label="Số Trang"
              rules={[
                { required: true, message: "Số trang không được để trống!" },
                { type: "number", min: 1, message: "Số trang phải lớn hơn 0!" },
              ]}
            >
              <InputNumber
                placeholder="Nhập số trang"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="categoryId"
              label="Danh Mục"
              rules={[
                { required: true, message: "Danh mục không được để trống!" },
              ]}
            >
              <Select placeholder="Chọn danh mục">
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end">
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            Tạo Sách
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default DrawerCreateBook;
