import React from 'react';
import  "./Header.css"

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="header-left">
                            <img src="https://mangadex.org/img/brand/mangadex-logo.svg" alt="img-logo"/>
                            <img src="https://mangadex.org/img/brand/mangadex-wordmark.svg" alt="" className="logo"/>

                        </div>
                        <div className="header-right">
                            <label className="header-right__search">
                                <input type="search" className="search"/>
                                <input type="button" value="S" className="search-button"/>
                            </label>

                            <button className="header-right__button-theme">Theme</button>
                            <div className="header-right__avatar">
                                <img src="" alt="" />
                                Иконка
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;