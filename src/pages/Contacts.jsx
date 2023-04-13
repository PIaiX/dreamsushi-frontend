import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaTelegramPlane, FaVk } from "react-icons/fa";
import { SlLocationPin, SlScreenSmartphone, SlClock } from "react-icons/sl";

const Contacts = () => {
  return (
    <main>
      <Container>
        <section className='mb-6'>
          <h1>Контакты</h1>
          <Row className="justify-content-center g-4 mb-5">
            <Col md={4}>
              <div className="d-flex">
                <SlLocationPin className='fs-20 main-color me-3' />
                <address className='flex-1 fs-12'>
                  <div>ул. Гагарина, 91</div>
                  <div className='mt-2'>Московский район, Казань</div>
                </address>
              </div>
            </Col>
            <Col md={4}>
              <a
                href="tel:+79872126076"
                className="d-flex align-items-center mb-4"
              >
                <SlScreenSmartphone className="main-color fs-20" />
                <span className='fs-12 ms-3'>+7(987)212-60-76</span>
              </a>
              <div className="d-flex align-items-center mb-4">
                <SlClock className="main-color fs-19" />
                <span className="fs-12 ms-3">с 10:00 до 22:00</span>
              </div>
            </Col>
            <Col md={4}>
              <ul className="list-unstyled">
                <li className="mb-4">
                  <a
                    className="vk"
                    target="_blank"
                    rel="noreferrer"
                    href="https://vk.com/xiao_sushi"
                  >
                    <FaVk />
                    <span className='fs-12 ms-3'>vk.com/xiao_sushi</span>
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="telegram"
                    target="_blank"
                    rel="noreferrer"
                    href="https://t.me/kafeSAO"
                  >
                    <FaTelegramPlane />
                    <span className='fs-12 ms-3'>telegram</span>
                  </a>
                </li>
              </ul>
            </Col>
          </Row>

          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A56c2aab17fea9f3c0259cfe46efa023f8aecbd7c7783abd2f32704b06cbc1377&amp;source=constructor"
            width="100%"
            height="500"
          />
        </section>
      </Container>
    </main>
  );
};

export default Contacts;