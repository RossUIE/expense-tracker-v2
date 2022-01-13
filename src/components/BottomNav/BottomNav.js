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
           <div className="nav-item">
                <i className="material-icons">
                    receipt_long
                </i>
                <span className="nav-text">Expenses</span>
            </div>

            <div className="nav-item active">
                <i className="material-icons">
                    add_circle_outline
                </i>
                <span className="nav-text">Add</span>
            </div>
            <div className="nav-item">
                <i className="material-icons">
                    category
                </i>
                <span className="nav-text">Categories</span>
            </div>
        </div>
    )
}

export default BottomNav;