import React from 'react';

const StoryLarge = (props) => {

    return (
        <figure className='story-large' onClick={props.onClick}>
            <img src={props.imgLink} alt={props.title}/>
            <figcaption>
                <div className='content'>
                    <div className='info'>
                        <div className='d-flex align-items-baseline mb-3'>
                            <div className='main-color fs-16 fw-7'>{props.price}&nbsp;₽</div>
                            <div className='ms-4 fs-12 fw-7'>1100&nbsp;г</div>
                        </div>
                        <h2 className='h1 fw-6 mt-lg-2'>{props.title} Филадельфия, Сакура, Острые маки с креветкой, Монро</h2>
                    </div>

                    <div className='ingredients'>
                        <h3 className='mb-2'>Состав сета</h3>
                        <p className='font-faded fs-09'>Филадельфия, Сакура, Острые маки с креветкой, Монро, Сливочно-запечённый угорь, Запечённый с курицей, Колумбия</p>
                    </div>
                    
                    <div className='g-btn'>
                        <button type='button' className='btn-2'>Заказать</button>
                    </div>
                </div>
            </figcaption>
        </figure>
    );
};

export default StoryLarge;