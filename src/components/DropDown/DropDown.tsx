import React, {useContext} from 'react';
import "./DropDown.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../redux/slice/users";
import {themeContext} from "../../roviders/ThemeContext";

const DropDown = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [color, setColor] = useContext(themeContext);

    const user = useAppSelector((state) => state.users.user);

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleSignOut = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className={`dropdown-content dropdown-${color}`}>
            <div className="dropdown-menu">
                <div className='dropdown-theme'>
                    <div className={`dropdown-item-icon text-${color}`} onClick={() => setColor("light")}>
                        <FontAwesomeIcon className='dropdown-icon' icon={faSun}/>
                    </div>
                    <div className={`dropdown-item-icon text-${color}`} onClick={() => setColor("dark")}>
                        <FontAwesomeIcon className='dropdown-icon' icon={faMoon}/>
                    </div>
                </div>

                {user ? (
                    <div  onClick={handleSignOut} className={`dropdown-button text-${color}`}>Sign Out</div>
                ) : (
                    <div onClick={handleSignIn} className={`dropdown-button text-${color}`} >Sign In</div>
                )}
            </div>
        </div>
    );
};

export default DropDown;
