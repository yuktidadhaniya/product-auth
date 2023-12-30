import { Col, InputNumber, Row, Slider, Space } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = (props) => {
  const IntegerStep = () => {
    const [inputValue, setInputValue] = useState(1);
    const [number, setNumber] = useState();
    const [value, setValue] = useState('');
    const { list } = useSelector((state) => state.product);

    const onChange = (newValue) => {
      console.log('newValue: ', newValue);
      const item = list.filter((items) => {
        return items.discountPercentage > newValue;
      });

      setInputValue(newValue);
      setNumber(item.discountPercentage);
    };
    // const handleInput = (newValue) => {
    //   setInputValue(newValue);
    // };

    return (
      <Row>
        <Col span={12}>
          <Slider
            min={1}
            max={20}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={20}
            style={{
              margin: '0 16px',
            }}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    );
  };
  return (
    <Space
      style={{
        width: '50%',
        marginTop: '30px',
      }}
      direction="vertical"
    >
      <IntegerStep />
    </Space>
  );
};
export default ProgressBar;
