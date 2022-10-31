import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Profile = () => {
    return (
        <section className="profile">
            <Row xs={1} md={2} className="g-4">
                <Col>
                    <input type="text" placeholder="Имя" value={'МоеИмя'} readOnly />
                </Col>
                <Col>
                    <input type="tel" placeholder="Номер телефона" value={'+7 965 583-95-63'} readOnly />
                </Col>
                <Col>
                    <div className="input-group">
                        <select readOnly value={'4'} className="col-4">
                            <option disabled>день</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <select readOnly value={'май'} className="col-8">
                            <option disabled>месяц</option>
                            <option value="январь">январь</option>
                            <option value="февраль">февраль</option>
                            <option value="март">март</option>
                            <option value="апрель">апрель</option>
                            <option value="май">май</option>
                            <option value="июнь">июнь</option>
                            <option value="июль">июль</option>
                            <option value="август">август</option>
                            <option value="сентябрь">сентябрь</option>
                            <option value="октябрь">октябрь</option>
                            <option value="ноябрь">ноябрь</option>
                            <option value="декабрь">декабрь</option>
                        </select>
                    </div>
                </Col>
                <Col>
                    <input type="email" placeholder="Электронная почта" value={'mail@mail.ru'} readOnly />
                </Col>
                <Col>
                    <button
                        type="button"
                        // onClick={handleShowEdit}
                        className="btn-1 w-100 mt-4"
                    >
                        Редактировать данные
                    </button>
                </Col>
            </Row>
        </section>
    )
}

export default Profile
