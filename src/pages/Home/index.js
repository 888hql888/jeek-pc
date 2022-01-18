import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./index.module.scss";
import { Modal, Button, DatePicker } from "antd";
import Slider from "react-slick";
import moment from 'moment';
export default function Home() {
  const dateFormat = 'YYYY-MM-DD';
  const [beginDate, setBeginDate] = useState(`${(new Date()).getFullYear()}-01-01`);
  const [endDate, setEndDate] = useState(`${(new Date()).getFullYear()}-12-31`)
  //向左滑动新增年份
  const onSwipe = (value) => {
    if (value === "left") {
      getMoreThree();
    }
  };
  // 配置文件
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3, //展示个数
    slidesToScroll: 3, //一次滑动几个
    onSwipe: onSwipe,
    adaptiveHeight: true,
  };

  const [yearArr, setYearArr] = useState([]);

  useEffect(() => {
    getYearArr();
  }, []);

  //初始化生成12个
  const getYearArr = () => {
    const currentYear = new Date().getFullYear();
    let yearArr_ = [];
    for (let i = currentYear; i <= currentYear + 12; i++) {
      yearArr_.push(i);
    }
    setYearArr(yearArr_);
  };

  //循环再生成3个
  const getMoreThree = () => {
    let new_arr = [];
    let last_year = yearArr[yearArr.length - 1];
    console.log(last_year, "last_year");
    for (let i = 1; i <= 3; i++) {
      new_arr.push(last_year + i);
    }
    setYearArr([...yearArr, ...new_arr]);
  };

  const [seletedYear, setSeletedYear] = useState(+new Date().getFullYear());
  //选中日历事件
  const handleYear = (value) => {
    console.log(value, "value....");
    setSeletedYear(value);
    setBeginDate(`${value}-01-01`)
    setEndDate(`${value}-12-31`)
  };
  // 弹窗相关.
  const [isModalVisible, setisModalVisible] = useState(false);
  const handleOk = () => {
    setisModalVisible(false);
  };
  const handleCancel = () => {
    setisModalVisible(false);
  };
  return (
    <>
      <Button
        onClick={() => {
          setisModalVisible(true);
        }}
      >
        点我生成日历...
      </Button>
      <Modal
        title="生成日历"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        mask={false}
        width={400}
      >
        <div className={styles.sliderWrap}>
          <div>
            <span>开始日期:</span>
            <DatePicker
            value={moment(beginDate, dateFormat)}
              onChange={(date) => {
                console.log(date?.format("YYYY-MM-DD"), "开始日期");
              }}
            />
          </div>
          <div style={{margin:'12px 0'}}>
          <span>结束日期:</span>
            <DatePicker
            value={moment(endDate, dateFormat)}
              onChange={(date) => {
                console.log(date?.format("YYYY-MM-DD"), "结束日期");
              }}
            />
          </div>
          <div>
            <Slider {...settings}>
              {yearArr.map((i) => (
                <li key={i}>
                  <div
                    className={[
                      styles.yearDiv,
                      i == seletedYear ? styles.seletedDiv : "",
                    ].join(" ")}
                    onClick={() => {
                      handleYear(i);
                    }}
                  >
                    {i}
                  </div>
                </li>
              ))}
            </Slider>
          </div>
        </div>
      </Modal>
    </>
  );
}
