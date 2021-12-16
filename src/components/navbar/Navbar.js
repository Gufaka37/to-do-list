import React from 'react';
import './navbar.css';
import { ReactComponent as Logo } from "../../svgs/logo.svg";
import { ReactComponent as UserAvatar } from "../../svgs/user_avatar.svg";
import { ReactComponent as DropdownArrow } from "../../svgs/dropdown_arrow.svg";

export const Navbar = () => {
    return (
      <div className="navbar">
        <div className="logo">
            <div className="mainLogo">
                <Logo />
                <p>To-Do</p>
            </div>
        </div>
        <p>
            Tasks
        </p>
        <div className="navbar-user">
            <p>
                Leanne Graham
            </p>
            <UserAvatar />
            <DropdownArrow className="user-dropdown" />
        </div>
      </div>
    );
}