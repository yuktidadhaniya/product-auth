import { UserOutlined, DownOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Card,
  Dropdown,
  Space,
  Button,
  Modal,
  message,
  Form,
  Input,
  Rate,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllUsers,
  deleteProduct,
  editProduct,
  productCategory,
} from './reducer/list';
import { Spin } from 'antd';
import Addproduct from '../src/Component/Addproduct';
import ProgressBar from '../src/Component/progressbar';

const Box = (props) => {
  const { Header, Content, Sider } = Layout;
  const { Search } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();
  const [modalData, setModalData] = useState({});
  const [messageApi] = message.useMessage();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  const menulist = [
    { name: 'charts', path: '/charts' },
    { name: 'contact', path: '/contact' },
    { name: 'back', path: './dashboard' },
    { name: 'login', path: '/' },
  ];

  const items2 = menulist.map((menu, index) => {
    // console.log("menu",menu)
    const key = String(index + 1);
    return {
      key: `icon${key}`,
      icon: <UserOutlined />,
      label: (
        <div>
          <Link to={menu.path}>{menu.name}</Link>
        </div>
      ),
    };
  });
  const items1 = menulist.map((menu, index) => ({
    label: (
      <div>
        <Link to={menu.path}>{menu.name}</Link>
      </div>
    ),
  }));
  const items = [
    {
      label: 'smartphones',
      key: '0',
    },
    {
      label: 'laptops',
      key: '1',
    },
    {
      label: 'skincare',
      key: '2',
    },
    {
      label: 'groceries',
      key: '3',
    },
    {
      label: 'home-decoration',
      key: '4',
    },
    {
      label: 'furniture',
      key: '5',
    },
    {
      label: 'tops',
      key: '6',
    },
    {
      label: 'womens-dresses',
      key: '7',
    },

    {
      label: 'womens-shoes',
      key: '8',
    },
    {
      label: 'mens-shirts',
      key: '9',
    },
    {
      label: 'mens-watches',
      key: '10',
    },
    {
      label: 'womens-watches',
      key: '11',
    },
    {
      label: 'womens-bags',
      key: '12',
    },
    {
      label: 'womens-jewellery',
      key: '13',
    },
    {
      label: 'sunglasses',
      key: '14',
    },
    {
      label: 'automotive',
      key: '15',
    },
    {
      label: 'motorcycle',
      key: '16',
    },
    {
      label: 'sunglasses',
      key: '17',
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.product);

  const handleSuccessFetchData = () => {
    setLoading(false);
  };
  useEffect(() => {
    dispatch(fetchAllUsers(handleSuccessFetchData));
  }, []);

  const viewCard = (id) => {
    props.history.push(`/viewcard/${id}`);
  };

  const handleChange = (event) => {
    console.log('event.target.name: ', event.target.name);
    if (event.target.name === 'title') {
      const updatedModalData = Object.assign(modalData, {
        title: event.target.value,
      });
      // console.log('updatedModalData: ', updatedModalData);
      setModalData({ ...updatedModalData });
    }

    if (event.target.name === 'price') {
      const updatedModalData = Object.assign(modalData, {
        price: event.target.value,
      });
      setModalData({ ...updatedModalData });
    }

    if (event.target.name === 'rating') {
      const updatedModalData = Object.assign(modalData, {
        rating: event.target.value,
      });
      setModalData({ ...updatedModalData });
    }

    if (event.target.name === 'stock') {
      const updatedModalData = Object.assign(modalData, {
        stock: event.target.value,
      });
      setModalData({ ...updatedModalData });
      // setStock(event.target.value)
    }
  };
  const showModal = (user) => {
    let newObj = Object.assign({}, user);

    setIsModalOpen(true);
    setModalData(newObj);

    setTitle(user.title);
    setPrice(user.price);
    setRating(user.rating);
  };

  const handleOk = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
    setIsModalOpen(false);
    const body = {
      title: modalData.title,
      price: modalData.price,
      rating: modalData.rating,
    };
    dispatch(editProduct(body, modalData.id));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClick = (key) => {
    message.info('Click on menu item.');
    const selectCategory = items.find((item) => {
      return item.key === key.key;
    });

    dispatch(productCategory(selectCategory.label));
  };
  const onSearch = (value) => {
    if (search) filteredData = list.filter((item) => item.price > value);
    console.log('filteredData: ', filteredData);

    setSearch(value);
    // console.log('updatedArray: ', updatedArray);
  };

  let filteredData = list;

  if (search) {
    filteredData = list.filter((item) => item.price > search);
  }
  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
          />
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={items2}
            />
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            ></Breadcrumb>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <div
                style={{
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <ProgressBar onChange={onChange} value={inputValue} />

                <Dropdown
                  menu={{
                    items,
                    onClick,
                  }}
                >
                  <Space>
                    Select Category
                    <DownOutlined />
                  </Space>
                </Dropdown>
                <Search
                  onSearch={onSearch}
                  placeholder="search product..."
                  style={{
                    width: 200,
                    marginRight: '50px',
                    margin: '25px',
                  }}
                />
                <Addproduct />
              </div>

              {loading ? (
                <Spin size="large" />
              ) : (
                <Card>
                  {filteredData.map((user) => (
                    <Card.Grid style={gridStyle}>
                      <>
                        <p>title: {user.title}</p>
                        <p>price: {user.price}</p>
                        <p>rating: {user.rating}</p>

                        <p>stock: {user.stock}</p>
                        <p>brand: {user.brand}</p>

                        <p>discountPercentage : {user.discountPercentage}</p>

                        <p>
                          <img
                            src={user.images}
                            alt=""
                            style={{
                              width: '50px',
                              alignItems: 'center',
                            }}
                          />
                        </p>
                        <p>
                          <Rate allowHalf defaultValue={user.rating} />
                        </p>
                      </>

                      <Space wrap>
                        <Button type="primary" onClick={() => showModal(user)}>
                          Edit
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => dispatch(deleteProduct(user.id))}
                        >
                          Delete
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => viewCard(user.id)}
                        >
                          View
                        </Button>
                      </Space>
                    </Card.Grid>
                  ))}
                </Card>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Modal
        title="Edit Product"
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
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            placeholder="input placeholder"
            value={modalData.price}
            type="number"
            name="price"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Rating">
          <Input
            placeholder="input placeholder"
            value={modalData.rating}
            type="number"
            name="rating"
            onChange={handleChange}
          />
        </Form.Item>
        {/* 

       
        <Form.Item label="Rating">
          <Input
            placeholder="input placeholder"
            value={modalData.rating}
            type="number"
            name="rating"
            onChange={handleChange}
          />
        </Form.Item> */}
      </Modal>
    </>
  );
};

export default Box;
