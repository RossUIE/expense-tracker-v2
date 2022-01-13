import React from 'react';

import './bottom-nav.scss';

const BottomNav = () => {

    const navItems = document.getElementsByClassName('nav-item');

    for (let i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', () => {
            for(let j = 0; j < navItems.length; j++) 
                navItems[j].classList.remove('active');
            
            navItems[i].classList.add('active');
         });
    }
    return (
        <div className='bottom-nav'>
           <div class="nav-item active">
                <i class="material-icons home-icon">
                    home
                </i>
                <span class="nav-text">Expenses</span>
            </div>

            <div class="nav-item">
                <i class="material-icons add-circle-icon">
                    add
                </i>
                <span class="nav-text">Add</span>
            </div>
            <div class="nav-item">
                <i class="material-icons search-icon">
                    search
                </i>
                <span class="nav-text">Categories</span>
            </div>
        </div>
    )
}

export default BottomNav;