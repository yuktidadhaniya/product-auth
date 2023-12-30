import { UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Layout, Menu, theme, Spin, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const App = (props) => {
  const { viewcardId } = props.match.params;

  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // const gridStyle = {
  //   width: '25%',
  //   textAlign: 'center',
  // };
  const { Header, Content, Sider } = Layout;

  const menulist = [
    { name: 'contact', path: '/contact' },
    { name: 'charts', path: '/charts' },
    { name: 'back', path: '/dashboard' },
  ];
  const items2 = menulist.map((menu, index) => {
    const key = String(index + 1);
    return {
      key: `icon${key}`,
      icon: <UserOutlined />,
      label: (
        <div>
          <Link to={menu.path}>{menu.name}</Link>

          {/* <Link to="/Charts">Charts</Link> */}
        </div>
      ),
    };
  });
  const items1 = menulist.map((menu, index) => ({
    label: (
      <div>
        <Link to={menu.path}>{menu.name}</Link>

        {/* <Link to="/Charts">Charts</Link> */}
      </div>
    ),
  }));
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${viewcardId}`)
      .then((response) => {
        console.log('response', response);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
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
            {loading ? (
              <Spin size="default" />
            ) : (
              <Card
                bordered={true}
                style={{
                  width: 1000,
                  gap: '20px',
                  fontSize: '18px',
                }}
              >
                <h1
                  style={{
                    fontSize: '30px',
                  }}
                >
                  View Product
                </h1>
                <h3>title: {data.title}</h3>
                <h3> price: {data.price}</h3>
                <h3>rating: {data.rating}</h3>

                <h3>stock: {data.stock}</h3>
                <h3>brand: {data.brand}</h3>
                <h3>discountPercentage : {data.discountPercentage}</h3>
                <p>
                  <img
                    src={data.images[0]}
                    alt=""
                    style={{
                      width: '200px',
                      height: '100px',
                      alignItems: 'center',
                    }}
                  />
                </p>
                <p>
                  <Rate allowHalf defaultValue={data.rating} />
                </p>
              </Card>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;

// https://v5.reactrouter.com/web/example/url-params
// https://ui.dev/react-router-v4-url-parameters
