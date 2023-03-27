import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import logo from '../../../images/logo.png'

const options = {
    burgerColor: '#eb4034',
    logo,
    logoWidth:'20vmax',
    navColor1:'rgba(0,0,0,0.4) ',
    logoHoverSize:'10px',
    logoHoverColor:'#eb4034',
    link1Text:'Search',
    link2Text:'Products',
    link3Text:'Profile',
    link4Text: 'Cart',
    link5Text:'congthuong',
    link1Url:'/search',
    link2Url:'/products',
    link3Url:'/login',
    link4Url:'/cart',
    link1Size:'1.3vmax',
    link1Color:'#fff',
    nav1justifyContent:'flex-end',
    nav2justifyContent:'flex-end',
    nav3justifyContent:'flex-start',
    nav4justifyContent:'flex-start',
    link1ColorHover:'#eb4034',
    link1Margin: '1vmax',
  
    profileIconColor:'rgba(35,35,35,0.8)',
    searchIconColor:'rgba(35,35,35,0.8)',
    cartIconColor:'rgba(35,35,35,0.8)',
    profileIconColorHover:'#eb4034',
    searchIconColorHover:'#eb4034',
    cartIconColorHover:'#eb4034',
    cartIconMargin:'1vmax',
}

function Header() {
    return <ReactNavbar {...options} />
}

export default Header