import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Filter.css';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { styled, Tab, Tabs, Grid, Tooltip, Menu, Typography,
       Avatar, MenuItem } from '@mui/material';


const StickyNavBar = styled(Grid)(({ theme }) => ({
    position: 'sticky',
    top: 0,
    zIndex: 1100, 
    backgroundColor: 'white',
    borderBottom: '2px solid #D9D9D9',
}));

export function NavBar() {
    const settings = ['Profile', 'Logout'];
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const [value, setValue] = useState((location.pathname.toLowerCase() === '/jobboard' || location.pathname.toLowerCase() === '/' || location.pathname.toLowerCase() === '') ? 0 : (location.pathname.toLowerCase() === '/dashboard' ? 1 : -1));
   
    const [last, setLast] = useState(localStorage.getItem("last"));
    const [first, setFirst] = useState(localStorage.getItem("first"));
    const isLoggedIn = () => !!localStorage.getItem("token");

    const navigate = useNavigate();

    console.log('Current route:', );

    // handle new value 
    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    // open nav menu
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        setIsDropdownOpen(true); 
    };

    // close nav menu
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setIsDropdownOpen(false); 
    };

    // go to job board
    const AllJobs = () => {
        navigate('/JobBoard');
        setValue(0); 
    }

    // go to profile
    const Profile = () => {
        navigate('/Profile')
    };

    // go to dashboard
    const goToDashboard = () => {
        navigate('/dashboard');
    };

    // go to signup
    const handleSignUp = () => {
        navigate('/signup');
    };

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        localStorage.removeItem("first");
        localStorage.removeItem("last");
        navigate('/login');
    }

    // handle settings actions
    const settingsActions = {
        'Profile': Profile,
        'Logout': handleLogout
    };

    // custom tab
    const CustomTab = styled((props) => <Tab {...props} />)(() => ({
        fontSize: '16px',
        paddingTop: '0.1%',
        marginTop: '1%',
        paddingBottom: '3.5%',
        textTransform: 'none',
        fontFamily: 'Outfit',
        fontWeight: 500,
        marginBottom: '4px',
    }))
    

    useEffect(() => {
        const currentPath = location.pathname.toLowerCase();
        let newValue;
        if (currentPath === '/jobboard' || currentPath === '/' || currentPath === '') {
            newValue = 0; 
        } else if (currentPath === '/dashboard') {
            newValue = 1;
        } else {
            newValue = false; 
        }
        setValue(newValue);
    }, [location]);

    return (
        <StickyNavBar container style={{ alignItems: 'center', height: '59px' }}>
            <h1 className='logo-font' onClick={AllJobs} style={{ height: '38px', marginTop: '12px', cursor:'pointer', color: '#4348DB', fontWeight: 400 }}>
                <svg width="135" height="29" viewBox="0 0 135 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.2482 6.68015C27.2482 6.59376 27.1176 6.55057 27.1176 6.55057C27.1176 6.55057 26.7193 6.49936 26.4645 6.46418C26.2008 6.42777 25.7897 6.367 25.7897 6.367C25.7897 6.367 25.0963 6.28583 24.6577 6.20502C24.3495 6.14822 23.8741 6.03225 23.8741 6.03225C23.8741 6.03225 23.509 5.94662 23.2863 5.85947C23.0281 5.75844 22.8842 5.69089 22.6551 5.53552C22.5368 5.45533 22.4727 5.40125 22.3684 5.31322L22.3503 5.29796C22.1991 5.17043 22.1277 5.08414 21.9802 4.95241C21.8548 4.8404 21.7819 4.78049 21.6537 4.67165C21.5437 4.57828 21.4858 4.52125 21.3707 4.43409C21.2639 4.35316 21.1995 4.31379 21.0877 4.23972C20.9701 4.16175 20.9063 4.11408 20.783 4.04535C20.6835 3.98994 20.626 3.96165 20.5218 3.91577C20.4381 3.87893 20.3903 3.86004 20.3041 3.82938C20.1952 3.79066 20.1327 3.77306 20.0211 3.74299C19.955 3.7252 19.917 3.71626 19.8518 3.70093L19.8469 3.6998C19.7707 3.68188 19.7282 3.67037 19.651 3.65661C19.5498 3.63856 19.3898 3.62421 19.3898 3.62421C19.3898 3.62421 18.8564 3.59238 18.5191 3.63501C18.4165 3.64798 18.3592 3.65792 18.2579 3.6782C18.1204 3.70571 18.0437 3.72411 17.9096 3.76459C17.7268 3.81976 17.6262 3.85864 17.4524 3.93737C17.2308 4.03775 17.1059 4.09859 16.9082 4.23972C16.7128 4.3792 16.619 4.4789 16.4511 4.65006C16.2575 4.84739 16.1529 4.96421 15.9939 5.18998C15.8261 5.42841 15.7375 5.5698 15.6239 5.83788L15.6151 5.85848C15.5176 6.08856 15.4651 6.21238 15.409 6.46288C15.3491 6.73007 15.3491 6.6707 15.3409 7.0257C15.3312 7.4444 15.3409 7.53166 15.3491 7.97698C15.3539 8.2361 15.379 8.30356 15.379 8.60044L15.4052 8.99068C15.4066 9.01041 15.431 9.01871 15.4435 9.00333L15.4581 8.98519C16.1455 8.13509 17.2921 6.71713 18.7585 6.19568C20.4565 5.59193 22.7634 6.20502 23.9612 6.55057C23.96 6.5744 23.9612 6.59251 23.9176 6.59376L21.5013 6.65855C21.5013 6.65855 21.1422 6.65836 20.9136 6.68015C20.7341 6.69726 20.6337 6.71185 20.4565 6.74494C20.189 6.79487 20.041 6.83582 19.7816 6.91771C19.592 6.97759 19.4865 7.0147 19.3027 7.09049C19.085 7.18026 18.963 7.23322 18.7585 7.34965C18.5724 7.45561 18.4752 7.52722 18.3014 7.652C18.1443 7.76474 18.0549 7.82704 17.9096 7.95435C17.7654 8.08069 17.6925 8.16041 17.5613 8.2999C17.4379 8.43097 17.3702 8.50602 17.2565 8.64545C17.1496 8.77661 17.0929 8.85286 16.9953 8.991C16.9249 9.09061 16.8848 9.14623 16.8211 9.25016C16.7263 9.40488 16.6846 9.49829 16.6035 9.6605C16.5325 9.80244 16.487 9.87988 16.4293 10.0276C16.3652 10.1919 16.3444 10.2913 16.2922 10.4596C16.2423 10.6202 16.2153 10.7093 16.1681 10.8699C16.1334 10.9878 16.1107 11.053 16.081 11.1723C16.0623 11.2478 16.0522 11.2903 16.0375 11.3666C16.015 11.4838 16.01 11.5508 15.9939 11.669C15.9757 11.8038 15.9668 11.8795 15.9504 12.0145C15.5228 15.5398 16.507 17.5992 15.9504 21.1068C15.9182 21.3095 15.9014 21.4234 15.8633 21.6251C15.8394 21.7519 15.8297 21.8239 15.798 21.949C15.7411 22.1741 15.6955 22.2978 15.6021 22.5105C15.4897 22.7667 15.4103 22.9046 15.2538 23.1369C15.1159 23.3417 15.0328 23.4548 14.862 23.6336C14.6629 23.8421 14.5336 23.9446 14.296 24.1087C14.071 24.2641 13.936 24.3415 13.6865 24.4543C13.4565 24.5582 13.3222 24.6094 13.077 24.6702C12.8763 24.72 12.7605 24.7374 12.5545 24.7566L12.531 24.7588C12.2755 24.7827 12.1387 24.7955 11.858 24.7566C11.7027 24.7351 11.6182 24.7081 11.4661 24.6702C11.234 24.6124 11.1023 24.5814 10.8784 24.4974C10.6684 24.4188 10.5508 24.3704 10.3559 24.2599C10.1286 24.1309 10.0129 24.0374 9.81173 23.8711C9.62232 23.7146 9.52032 23.6203 9.3546 23.4392C9.1877 23.2568 9.10005 23.1477 8.96277 22.9425C8.76727 22.6502 8.66782 22.4739 8.54917 22.1434C8.46961 21.9218 8.45038 21.7895 8.39679 21.5603C8.34969 21.3589 8.31308 21.2472 8.28795 21.042C8.25208 20.7489 8.27346 20.5809 8.28795 20.2861C8.30126 20.0153 8.30454 19.8617 8.35326 19.595C8.39553 19.3635 8.421 19.2316 8.50563 19.0119C8.56264 18.8639 8.60799 18.7863 8.67978 18.6447C8.74474 18.5167 8.79072 18.4368 8.8757 18.3208C8.93589 18.2386 8.96277 18.2128 9.02807 18.1264C9.09338 18.04 9.06073 17.9968 9.06073 17.9968C9.04702 17.9696 9.00631 17.932 9.00631 17.932C8.95933 17.8958 8.85393 17.932 8.85393 17.932L8.67978 17.9968C8.67978 17.9968 8.28154 18.1567 8.0485 18.2992C7.79081 18.4568 7.66745 18.5773 7.43899 18.7743L7.41831 18.7921C7.19954 18.9808 7.06955 19.0928 6.87301 19.3142C6.69658 19.513 6.60601 19.6328 6.45941 19.8541C6.28392 20.1191 6.19015 20.2741 6.06758 20.5668C5.97168 20.7959 5.93287 20.931 5.87167 21.1716C5.81657 21.3881 5.78798 21.5112 5.76282 21.7331C5.72671 22.0515 5.74958 22.2335 5.76282 22.5537C5.77261 22.7903 5.76375 22.9255 5.80636 23.1584C5.8491 23.3921 5.90343 23.5167 5.98051 23.7416C6.05676 23.964 6.10612 24.0866 6.19819 24.3031C6.28545 24.5082 6.32438 24.6292 6.43764 24.8214C6.56034 25.0296 6.65379 25.1314 6.8077 25.3181C6.9373 25.4754 7.01764 25.5571 7.156 25.7069C7.38759 25.9575 7.50733 26.1096 7.76551 26.3332C7.98967 26.5273 8.12828 26.6217 8.37502 26.7867C8.60595 26.9411 8.74137 27.0192 8.98454 27.1538C9.16052 27.2513 9.25997 27.3049 9.44167 27.3914C9.6339 27.4829 9.74176 27.5357 9.94234 27.6074C10.0764 27.6553 10.1526 27.692 10.2906 27.737C10.375 27.7644 10.4227 27.7786 10.5083 27.8017C10.576 27.82 10.6145 27.8281 10.6825 27.8449C10.7505 27.8618 10.7876 27.8757 10.8566 27.8881C10.9407 27.9033 10.989 27.9102 11.0743 27.9205C11.1401 27.9285 11.178 27.9318 11.2424 27.9373L11.2484 27.9378C11.3333 27.9451 11.3809 27.9512 11.4661 27.9529C11.5001 27.9536 11.5192 27.9529 11.5532 27.9529H11.7056H12.4239C12.5174 27.9529 12.5699 27.9566 12.6634 27.9529C12.7657 27.9489 12.8226 27.9402 12.9246 27.9313C13.0181 27.9232 13.0705 27.9176 13.1641 27.9097C13.2745 27.9005 13.3367 27.8988 13.447 27.8881C13.5237 27.8807 13.5668 27.8774 13.643 27.8665C13.6941 27.8592 13.7227 27.8543 13.7736 27.8449C13.8162 27.8371 13.8399 27.8318 13.8824 27.8233C13.9249 27.8149 13.9489 27.8111 13.9913 27.8017C14.0859 27.7809 14.1374 27.7629 14.2307 27.7369C14.2903 27.7204 14.3239 27.7116 14.3831 27.6938C14.486 27.6628 14.5423 27.6411 14.6443 27.6074C14.7463 27.5736 14.8046 27.5579 14.9055 27.521L14.9161 27.5171C14.9955 27.4881 15.0433 27.4706 15.1232 27.4346C15.1925 27.4034 15.2293 27.3819 15.2974 27.3482L15.4715 27.2618L15.6457 27.1754C15.7647 27.1164 15.8331 27.0865 15.9504 27.0243C16.0713 26.9601 16.1387 26.9232 16.2552 26.8515C16.3593 26.7873 16.4168 26.7497 16.5164 26.6787C16.6393 26.5911 16.7111 26.5442 16.8211 26.4411C16.8561 26.4084 16.8742 26.3885 16.9082 26.3548L16.9953 26.2684L17.0824 26.182L17.1694 26.0956L17.3 25.966C17.4191 25.8479 17.492 25.7876 17.6048 25.6637C17.6938 25.5659 17.7386 25.5066 17.8225 25.4045C17.8913 25.3208 17.9286 25.2729 17.9966 25.1885C18.0646 25.1042 18.1063 25.0596 18.1708 24.9726C18.2434 24.8746 18.3449 24.7134 18.3449 24.7134C18.3449 24.7134 18.4578 24.5596 18.5191 24.4543C18.5761 24.3563 18.5987 24.2963 18.6497 24.1951L18.7803 23.9359L18.8674 23.7632C18.9014 23.6957 18.923 23.6591 18.9544 23.5904C18.9907 23.5111 19.0083 23.4637 19.0377 23.3848L19.0415 23.3744C19.0787 23.2743 19.0914 23.2153 19.1286 23.1153C19.1603 23.03 19.1854 22.985 19.2157 22.8993C19.2566 22.7834 19.2744 22.7165 19.3027 22.5969C19.3226 22.5132 19.3283 22.4651 19.3463 22.381C19.3625 22.3049 19.3753 22.263 19.3898 22.1866C19.4136 22.0612 19.4169 21.9892 19.4333 21.8626C19.9265 18.0734 19.0893 15.8806 19.4769 12.0793C19.4932 11.919 19.5204 11.669 19.5204 11.669L19.564 11.2371L19.6075 10.9347L19.6946 10.6323L19.7816 10.2652C19.7816 10.2652 19.8306 10.0928 19.8687 9.98445C19.8912 9.92043 19.9058 9.88336 19.9294 9.8233L19.934 9.81167C19.9507 9.76936 19.9639 9.74444 19.9841 9.70369C20.006 9.65956 20.0174 9.63793 20.0429 9.59571C20.1288 9.4529 20.2605 9.22856 20.2605 9.22856L20.4782 8.88301L20.9136 8.40789L21.3054 8.06234L21.5666 7.86797L21.7843 7.73839L21.9149 7.652L22.002 7.60881L22.0891 7.56561L22.1762 7.52242L22.2632 7.47923L22.3503 7.43603L22.4374 7.39284L22.568 7.34965L22.6986 7.30645L22.8292 7.26326L22.9816 7.22007L23.134 7.17687L23.2863 7.13368L23.504 7.09049L23.7652 7.04729L24.1353 7.0041L24.8319 6.96091C24.8319 6.96091 25.3889 6.93869 25.7462 6.92851C26.29 6.91301 27.0305 6.93108 27.1393 6.91771C27.2482 6.90434 27.2482 6.87452 27.2482 6.83133V6.68015Z" fill="#4A4FE4" stroke="#4A4FE4" stroke-width="0.217454"/>
                    <path d="M12.2371 9.93633C12.3101 9.97532 12.3708 10.015 12.4213 10.0544C12.572 10.1717 12.4052 10.3289 12.2234 10.2703C11.4787 10.0304 10.2529 9.88898 9.27458 9.93633C8.48331 9.97462 3.26985 10.7071 0.242133 11.1203C0.112229 11.138 0.0277126 11.2663 0.0727452 11.3894C1.00441 13.9368 5.3585 14.3966 7.47912 14.3005C9.76249 14.1373 11.6128 12.9174 12.6199 11.8615C12.7645 11.7099 12.9911 11.8073 12.9075 11.9994C12.2737 13.4562 9.5839 14.5104 7.6735 15.1926C7.47995 15.2617 7.48453 15.5271 7.68379 15.5774C9.95434 16.151 11.933 15.4274 12.686 14.9537C13.1647 14.6524 13.47 14.3421 14.2121 13.3208C14.9542 12.2995 15.1397 10.9457 14.7507 9.93633C14.631 9.65924 14.4814 9.19412 13.7333 8.80817C13.0868 8.47463 12.1174 7.94721 10.8606 7.68001C9.88637 7.4729 8.62992 7.12221 7.85206 6.80201C7.67449 6.72891 7.49361 6.88559 7.592 7.0505C8.16736 8.01483 9.66283 9.05388 10.4416 9.34256C11.0401 9.56441 11.8181 9.7582 12.2371 9.93633Z" fill="#A0A4FF"/>
                    <path d="M8.23572 6.3736C5.68853 5.31447 5.0488 2.50738 5.16717 1.14562C5.1735 1.07279 5.2505 1.03118 5.3168 1.062L11.3778 3.87977C14.0855 5.21279 14.8423 7.71994 14.9567 8.96804C14.959 8.99342 14.909 9.00561 14.8951 8.98429C14.6391 8.59348 13.9266 8.24697 13.5622 8.03615C12.1174 7.20009 9.6636 6.8783 8.23572 6.3736Z" fill="#4A4FE4" stroke="#4A4FE4" stroke-width="0.217454"/>
                    <path d="M120.468 15.2571C120.468 14.5201 120.609 13.8285 120.893 13.1826C121.177 12.5366 121.56 11.9735 122.044 11.4932C122.536 11.0045 123.108 10.6195 123.758 10.3379C124.409 10.0563 125.106 9.91553 125.848 9.91553H133.103C133.643 9.91553 134.081 10.3536 134.081 10.8941V12.5022C134.081 13.0426 133.643 13.4807 133.103 13.4807H125.848C125.598 13.4807 125.364 13.5263 125.147 13.6174C124.93 13.7085 124.738 13.8368 124.572 14.0025C124.413 14.1598 124.288 14.3461 124.196 14.5615C124.105 14.7768 124.059 15.0087 124.059 15.2571C124.059 15.5056 124.105 15.7416 124.196 15.9652C124.288 16.1805 124.413 16.371 124.572 16.5366C124.738 16.694 124.93 16.8182 125.147 16.9093C125.364 17.0004 125.598 17.0459 125.848 17.0459H129.439C130.181 17.0459 130.878 17.1867 131.529 17.4683C132.188 17.7416 132.759 18.1225 133.243 18.6111C133.735 19.0915 134.119 19.6587 134.394 20.313C134.678 20.9589 134.819 21.6505 134.819 22.3875C134.819 23.1246 134.678 23.8161 134.394 24.462C134.119 25.108 133.735 25.6753 133.243 26.1639C132.759 26.6442 132.188 27.0252 131.529 27.3067C130.878 27.5883 130.181 27.7291 129.439 27.7291H122.447C121.907 27.7291 121.469 27.291 121.469 26.7505V25.1424C121.469 24.602 121.907 24.1639 122.447 24.1639H129.439C129.689 24.1639 129.923 24.1183 130.14 24.0272C130.357 23.9362 130.544 23.8119 130.703 23.6546C130.87 23.4889 130.999 23.2985 131.091 23.0832C131.182 22.8678 131.228 22.636 131.228 22.3875C131.228 22.1391 131.182 21.9072 131.091 21.6919C130.999 21.4765 130.87 21.2902 130.703 21.1329C130.544 20.9672 130.357 20.8389 130.14 20.7478C129.923 20.6567 129.689 20.6111 129.439 20.6111H125.848C125.106 20.6111 124.409 20.4703 123.758 20.1888C123.108 19.9072 122.536 19.5262 122.044 19.0459C121.56 18.5573 121.177 17.99 120.893 17.3441C120.609 16.6898 120.468 15.9942 120.468 15.2571Z" fill="#4A4FE4"/>
                    <path d="M118.293 22.3875C118.293 23.1246 118.157 23.8161 117.887 24.462C117.616 25.108 117.246 25.6753 116.776 26.1639C116.314 26.6442 115.773 27.0252 115.152 27.3067C114.531 27.5883 113.866 27.7291 113.157 27.7291H105.572C105.031 27.7291 104.593 27.291 104.593 26.7505V10.8941C104.593 10.3536 105.031 9.91553 105.572 9.91553H113.157C113.866 9.91553 114.531 10.0563 115.152 10.3379C115.773 10.6195 116.314 11.0045 116.776 11.4932C117.246 11.9735 117.616 12.5366 117.887 13.1826C118.157 13.8285 118.293 14.5201 118.293 15.2571C118.293 15.5884 118.249 15.9279 118.161 16.2757C118.074 16.6236 117.95 16.959 117.791 17.2819C117.632 17.6049 117.441 17.8989 117.218 18.1639C116.927 18.5095 116.944 19.1184 117.23 19.4683C117.453 19.7333 117.644 20.0273 117.803 20.3503C117.962 20.6732 118.082 21.0128 118.161 21.3689C118.249 21.7167 118.293 22.0562 118.293 22.3875ZM108.021 23.1854C108.021 23.7258 108.459 24.1639 109 24.1639H113.157C113.396 24.1639 113.619 24.1183 113.826 24.0272C114.033 23.9362 114.212 23.8119 114.363 23.6546C114.523 23.4889 114.646 23.2985 114.734 23.0832C114.821 22.8678 114.865 22.636 114.865 22.3875C114.865 22.1391 114.821 21.9072 114.734 21.6919C114.646 21.4765 114.523 21.2902 114.363 21.1329C114.212 20.9672 114.033 20.8389 113.826 20.7478C113.619 20.6567 113.396 20.6111 113.157 20.6111H109C108.459 20.6111 108.021 21.0492 108.021 21.5897V23.1854ZM108.021 16.0674C108.021 16.6078 108.459 17.0459 109 17.0459H113.157C113.396 17.0459 113.619 17.0004 113.826 16.9093C114.033 16.8182 114.212 16.694 114.363 16.5366C114.523 16.371 114.646 16.1805 114.734 15.9652C114.821 15.7416 114.865 15.5056 114.865 15.2571C114.865 15.0087 114.821 14.7768 114.734 14.5615C114.646 14.3461 114.523 14.1598 114.363 14.0025C114.212 13.8368 114.033 13.7085 113.826 13.6174C113.619 13.5263 113.396 13.4807 113.157 13.4807H109C108.459 13.4807 108.021 13.9188 108.021 14.4593V16.0674Z" fill="#4A4FE4"/>
                    <path d="M102.419 18.8163C102.419 19.6331 102.309 20.4219 102.09 21.1826C101.879 21.9354 101.579 22.6441 101.19 23.3087C100.8 23.9654 100.33 24.566 99.7778 25.1105C99.2261 25.655 98.6176 26.1235 97.9523 26.5159C97.2869 26.9003 96.5689 27.1966 95.7981 27.4048C95.0273 27.621 94.2281 27.7291 93.4005 27.7291C92.5729 27.7291 91.7738 27.621 91.003 27.4048C90.2403 27.1966 89.5222 26.9003 88.8488 26.5159C88.1835 26.1235 87.575 25.655 87.0233 25.1105C86.4715 24.566 85.9969 23.9654 85.5993 23.3087C85.2099 22.6441 84.9056 21.9354 84.6865 21.1826C84.4756 20.4219 84.3701 19.6331 84.3701 18.8163C84.3701 17.9995 84.4756 17.2107 84.6865 16.45C84.9056 15.6892 85.2099 14.9805 85.5993 14.3239C85.9969 13.6672 86.4715 13.0666 87.0233 12.5221C87.575 11.9776 88.1835 11.5131 88.8488 11.1287C89.5222 10.7443 90.2403 10.4481 91.003 10.2398C91.7738 10.0236 92.5729 9.91553 93.4005 9.91553C94.2281 9.91553 95.0273 10.0236 95.7981 10.2398C96.5689 10.4481 97.2869 10.7443 97.9523 11.1287C98.6176 11.5131 99.2261 11.9776 99.7778 12.5221C100.33 13.0666 100.8 13.6672 101.19 14.3239C101.579 14.9805 101.879 15.6892 102.09 16.45C102.309 17.2107 102.419 17.9995 102.419 18.8163ZM98.9502 18.8163C98.9502 18.0636 98.8042 17.3549 98.5121 16.6902C98.22 16.0175 97.8224 15.437 97.3194 14.9485C96.8245 14.452 96.2362 14.0596 95.5547 13.7713C94.8813 13.483 94.1632 13.3389 93.4005 13.3389C92.6297 13.3389 91.9076 13.483 91.2342 13.7713C90.5608 14.0596 89.9725 14.452 89.4695 14.9485C88.9665 15.437 88.5689 16.0175 88.2768 16.6902C87.9847 17.3549 87.8387 18.0636 87.8387 18.8163C87.8387 19.569 87.9847 20.2777 88.2768 20.9424C88.5689 21.599 88.9665 22.1756 89.4695 22.6721C89.9725 23.1686 90.5608 23.561 91.2342 23.8493C91.9076 24.1376 92.6297 24.2817 93.4005 24.2817C94.1632 24.2817 94.8813 24.1376 95.5547 23.8493C96.2362 23.561 96.8245 23.1686 97.3194 22.6721C97.8224 22.1756 98.22 21.599 98.5121 20.9424C98.8042 20.2777 98.9502 19.569 98.9502 18.8163Z" fill="#4A4FE4"/>
                    <path d="M81.9782 20.6111C81.9782 21.5966 81.7962 22.5242 81.4323 23.3937C81.0683 24.255 80.5709 25.0086 79.9401 25.6546C79.3174 26.2922 78.5814 26.7974 77.7322 27.1701C76.8911 27.5428 75.9894 27.7291 75.0269 27.7291C74.6927 27.7291 74.3585 27.7045 74.0243 27.6554C73.5821 27.5905 73.28 27.1929 73.28 26.7459V24.5936C73.28 24.1927 73.7307 23.9327 74.1171 24.0397C74.4163 24.1225 74.7196 24.1639 75.0269 24.1639C75.5041 24.1639 75.953 24.0728 76.3735 23.8906C76.8022 23.7001 77.1742 23.4434 77.4896 23.1204C77.805 22.7974 78.0517 22.4206 78.2296 21.99C78.4156 21.5594 78.5086 21.0997 78.5086 20.6111V10.8941C78.5086 10.3536 78.9467 9.91553 79.4872 9.91553H80.9996C81.5401 9.91553 81.9782 10.3536 81.9782 10.8941V20.6111Z" fill="#4A4FE4"/>
                    <path d="M68.0627 26.7505C68.0627 27.291 67.6246 27.7291 67.0842 27.7291H65.5711C65.0307 27.7291 64.5925 27.291 64.5925 26.7505V22.9091C64.5925 22.4631 64.2878 22.0805 63.8706 21.9227C63.3755 21.7354 62.9084 21.4929 62.4692 21.195C61.8302 20.756 61.2801 20.2343 60.819 19.6298C60.358 19.0169 59.998 18.342 59.7392 17.6049C59.4884 16.8596 59.363 16.077 59.363 15.2571V10.8941C59.363 10.3536 59.8011 9.91553 60.3416 9.91553H61.8668C62.4072 9.91553 62.8453 10.3536 62.8453 10.8941V15.2571C62.8453 15.7457 62.9343 16.2095 63.1123 16.6484C63.2983 17.079 63.5491 17.4559 63.8645 17.7788C64.18 18.1018 64.5481 18.3585 64.9687 18.549C65.3974 18.7312 65.8504 18.8223 66.3276 18.8223C66.8049 18.8223 67.2538 18.7312 67.6744 18.549C68.1031 18.3585 68.4752 18.1018 68.7907 17.7788C69.1062 17.4559 69.3529 17.079 69.5308 16.6484C69.7169 16.2095 69.8099 15.7457 69.8099 15.2571V10.8941C69.8099 10.3536 70.248 9.91553 70.7885 9.91553H72.3015C72.842 9.91553 73.2801 10.3536 73.2801 10.8941V15.2571C73.2801 16.077 73.1507 16.8596 72.8918 17.6049C72.6411 18.342 72.2851 19.0169 71.8241 19.6298C71.363 20.2343 70.8129 20.756 70.1739 21.195C69.7405 21.4926 69.2774 21.7351 68.7845 21.9223C68.3675 22.0807 68.0627 22.4631 68.0627 22.9091V26.7505Z" fill="#4A4FE4"/>
                    <path d="M48.1815 26.8111C48.1815 27.3181 47.7705 27.7291 47.2635 27.7291H45.4942C44.9872 27.7291 44.5762 27.3181 44.5762 26.8111V10.8336C44.5762 10.3265 44.9872 9.91553 45.4942 9.91553H56.2705C56.7775 9.91553 57.1885 10.3265 57.1885 10.8336V12.5627C57.1885 13.0697 56.7775 13.4807 56.2705 13.4807H49.0995C48.5925 13.4807 48.1815 13.8917 48.1815 14.3988V16.1279C48.1815 16.6349 48.5925 17.0459 49.0995 17.0459H52.6651C53.1722 17.0459 53.5832 17.4569 53.5832 17.964V19.6931C53.5832 20.2001 53.1722 20.6111 52.6651 20.6111H49.0995C48.5925 20.6111 48.1815 21.0221 48.1815 21.5291V26.8111Z" fill="#4A4FE4"/>
                    <path d="M33.5497 26.8111C33.5497 27.3181 33.1387 27.7291 32.6317 27.7291H30.9246C30.4176 27.7291 30.0066 27.3181 30.0066 26.8111V10.8336C30.0066 10.3265 30.4176 9.91553 30.9246 9.91553H41.4834C41.9904 9.91553 42.4015 10.3265 42.4015 10.8336V12.5627C42.4015 13.0697 41.9904 13.4807 41.4834 13.4807H34.4678C33.9608 13.4807 33.5497 13.8917 33.5497 14.3988V16.1279C33.5497 16.6349 33.9608 17.0459 34.4678 17.0459H37.9403C38.4473 17.0459 38.8583 17.4569 38.8583 17.964V19.6931C38.8583 20.2001 38.4473 20.6111 37.9403 20.6111H34.4678C33.9608 20.6111 33.5497 21.0221 33.5497 21.5291V26.8111Z" fill="#4A4FE4"/>
                    <path d="M26.7449 26.7505C26.7449 27.291 26.3068 27.7291 25.7663 27.7291H24.2442C23.7037 27.7291 23.2656 27.291 23.2656 26.7505V10.8941C23.2656 10.3536 23.7037 9.91553 24.2442 9.91553H25.7663C26.3068 9.91553 26.7449 10.3536 26.7449 10.8941V26.7505Z" fill="#4A4FE4"/>
                </svg>
            </h1>

            <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', maxWidth: 'calc(100% - 420px)' }}> 
            <Tabs value={value === false ? false : value} onChange={handleChange} aria-label="basic tabs example"  textColor='inherit' TabIndicatorProps={{ style: { background: '#4348DB',height: '4px', borderRadius: '5px'} }}>
                <CustomTab label="All Jobs" value={0} onClick={AllJobs} />
                {isLoggedIn() && <CustomTab label="Dashboard" value={1} onClick={goToDashboard} />}
            </Tabs>
            </div>

            <div style={{ position: 'absolute', right: '200px', top: 0, bottom: 0 }}>
                <div style={{ height: '59px', borderRight: '2px solid #D9D9D9' }}></div>
            </div>

            {isLoggedIn() ? (
                // logged in
                  <>
                    <div style={{ position: 'absolute', left: 'calc(100% - 162px)', top: '51%', transform: 'translate(-10%, -50%)', display: 'flex', alignItems: 'center', }}>
                        <Tooltip onClick={handleOpenUserMenu} style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='profile-picture'>
                                <Avatar sx={{ bgcolor: "#4A4FE4", marginRight: 10, color: "#white", width: 25, height: 25, fontSize: '14px', fontFamily: 'Outfit' }}>{first[0] + last[0]}</Avatar>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', maxWidth: '120px', wordBreak: 'break-all', marginLeft: '5px' }}>
                                <span style={{ fontWeight: 500, fontSize: '16px', color: '#5B5B5B', fontFamily: 'Outfit', marginTop: '-0.665px', textDecoration: 'underline' }}>{first} <span style={{whiteSpace: 'nowrap'}}>{last}</span></span>
                            </div>
                            {isDropdownOpen ? <ArrowDropUpIcon className='arrow-pad' style={{ marginLeft: '2px', color: '#4A4FE4'}}/> : <ArrowDropDownIcon className='arrow-pad' style={{ marginLeft: '2px', color: '#D9D9D9' }}/>}
                        </Tooltip>
                            <Menu
                                sx={{ mt: '7.75px', alignItems: 'center', }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                PaperProps={{
                                    sx: { borderRadius: '10px', width: '110px' } 
                                }}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => { handleCloseUserMenu(); settingsActions[setting](); }}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 400, fontFamily: 'Outfit' }}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                </>
            ) : (
                // not logged in
                <div style={{ position: 'absolute', left: 'calc(100% - 180px)', top: 0, bottom: 0, display: 'flex', alignItems: 'center', }}>
                    <div className='first-font' onClick={handleSignUp} style={{ cursor: 'pointer', marginBottom: '-2px', whiteSpace: 'nowrap', color: '#5B5B5B', fontWeight: 500 }}>
                        Join Now
                    </div>
                    <div className='first-font' onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '15px', marginBottom: '-1px', whiteSpace: 'nowrap', padding: '5px 10px', backgroundColor: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: '8px', color: '#5B5B5B', fontWeight: 500 }}>
                        Log in
                    </div>
                </div>
             )}
        </StickyNavBar>
    );
}
