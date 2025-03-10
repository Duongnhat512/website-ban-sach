import { Col, Row, Card, Image } from "antd";
import { useEffect, useState } from "react";
import "./Suggest.scss";
import { callGetBook } from "../../service/BookService";
import product1 from "../../assets/images/product1.png";

function Suggest() {
  const [bookList, setBookList] = useState([]);

  const handleGetAllBook = async () => {
    try {
      const response = await callGetBook(1, 20);
      if (response && response.code === 200) {
        setBookList(response.result.result);
      }
      console.log(response.result.result);
    } catch (error) {
      console.error("Failed to fetch book list:", error);
    }
  };

  useEffect(() => {
    handleGetAllBook();
  }, []);

  return (
    <div className="suggest">
      <div className="suggest-background" style={{ backgroundColor: "#33b564" }}></div>
      <div className="suggest-content ">
        <Row gutter={[16, 16]}>
          {bookList.map((book) => (
            <Col span={6} key={book.id} >
              <Card
                hoverable
                cover={
                  <Image
                    alt={book.title}
                    src={book.thumbnail || product1} // Sử dụng hình ảnh placeholder cục bộ
                    className="w-full h-48 object-cover"
                  />
                }
              >
                <Card.Meta
                  title={<div className="text-lg font-semibold">{book.title}</div>}
                  description={
                    <>
                      <div className="text-sm text-gray-500">
                        {book.originalPrice && (
                          <span className="line-through mr-2">
                            {book.originalPrice}đ
                          </span>
                        )}
                        {book.discount && (
                          <span className="text-red-500">{book.discount}%</span>
                        )}
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {book.currentPrice ? `${book.currentPrice}đ` : "Liên hệ"}
                      </div>
                      <div className="text-sm text-gray-500">Đã bán 420</div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Suggest;