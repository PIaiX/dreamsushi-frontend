import React, {useState} from 'react';
import { BsHeart, BsHeartFill } from "react-icons/bs";

function BtnFav(props) {
    const [fav, setFav] = useState(props.favState)

    return (
        <button type='button' className='btn-fav' onClick={() => setFav((fav)?false:true)}>
            <BsHeart className='icon-stroke'/>
            <BsHeartFill className={(fav) ? 'icon-fill opacity-1' : 'icon-fill opacity-0'}/>
        </button>
    );
}

export default BtnFav;