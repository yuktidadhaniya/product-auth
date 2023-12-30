import { Button, Modal, Input, Form } from 'antd';
import { useState } from 'react';
import { addProductList } from '../reducer/list';
import { useDispatch } from 'react-redux';
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState('');
  const [discountPercentage, setDisCountPercentage] = useState(0);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const body = {
      title: title,
      price: price,
      rating: rating,
      Stock: stock,
    };
    setIsModalOpen(false);
    dispatch(addProductList(body));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);
  const onRatingChanged = (e) => setRating(e.target.value);
  const onStockChanged = (e) => setStock(e.target.value);
  const onBrandChanged = (e) => setBrand(e.target.value);
  const onDiscountChanged = (e) => setDisCountPercentage(e.target.value);
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          marginRight: '20px',
          marginTop: '22px',
        }}
      >
        Add
      </Button>
      <Modal
        title="Add Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form.Item label="Title">
          <Input
            placeholder="input placeholder"
            value={modalData.title}
            type="text"
            name="title"
            onChange={onTitleChanged}
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            placeholder="input placeholder"
            value={modalData.price}
            type="number"
            name="price"
            onChange={onPriceChanged}
          />
        </Form.Item>
        <Form.Item label="Rating">
          <Input
            placeholder="input placeholder"
            value={modalData.rating}
            type="number"
            name="rating"
            onChange={onRatingChanged}
          />
        </Form.Item>
        <Form.Item label="Stock">
          <Input
            placeholder="input placeholder"
            value={modalData.stock}
            type="number"
            name="stock"
            onChange={onStockChanged}
          />
        </Form.Item>
        <Form.Item label="Brand">
          <Input
            placeholder="input placeholder"
            value={modalData.brand}
            type="text"
            name="brand"
            onChange={onBrandChanged}
          />
        </Form.Item>
        <Form.Item label="Discount Percentage">
          <Input
            placeholder="input placeholder"
            value={modalData.discountpercentage}
            type="number"
            name="discountpercentage"
            onChange={onDiscountChanged}
          />
        </Form.Item>
      </Modal>
    </>
  );
};
export default App;
