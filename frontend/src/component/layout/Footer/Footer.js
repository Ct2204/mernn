import appStore from '../../../images/appstore.png'
import playStore from '../../../images/playstore.png'
import React from 'react'
import './Footer.css'


function Footer() {
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <h4>DOWN LOAD OUR APP</h4>
                <p>Download App For Android And IOS Mobile Phone</p>
                <img src={playStore} alt="Play Store" />
                <img src={appStore} alt="App Store" />
            </div>
            <div className='midFooter'>
                <h1>ECOMMERE</h1>
                <p>High Quality is our first priority</p>

                <p>Copyright 2023 &copy; CongThuong</p>
            </div>
            <div className='rightFooter'>
                <h4>Follow Us</h4>
                <a href="https://www.instagram.com/ct2204__/">Instagram</a>
                <a href="https://www.facebook.com/profile.php?id=100008177227426">FaceBook</a>
                <a href="https://www.tiktok.com/">TikTok</a>
            </div>
        </footer>
    )
}

export default Footer;