'use client';

import Link from 'next/link'
import { GrTechnology } from "react-icons/gr";
import styles from './header.module.css'
import { CiMenuBurger } from "react-icons/ci";
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { usePathname } from 'next/navigation'

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar = ({isAdmin}: NavbarProps) => {
  const[toggle, setToggle] = useState(false)
  const pathname = usePathname()
  console.log(pathname, 'pathname')
  
  return (
    <nav className={styles.navbar}>
        <div>
          <Link className={styles.logo} href="/">CLOUD <GrTechnology /> HOSTING</Link>
        </div>
        <div className= {styles.menu}>
          {toggle? <IoMdClose onClick={() => setToggle(prev => !prev)}/> :  <CiMenuBurger onClick={() => setToggle(prev => !prev)}/>}
        </div>
        <div className= {styles.navLinksWrapper}
              style={{
                clipPath: toggle && "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" || ""
              }}>
          <ul className={styles.navLinks}>
            <Link onClick={() => setToggle(false)} className={styles.navLink} href='/'>Home</Link>
            <Link onClick={() => setToggle(false)} className={styles.navLink} href='/articles?pageNumber=1'>Articles</Link>
            <Link onClick={() => setToggle(false)} className={styles.navLink} href='/about'>About</Link>
            {isAdmin && 
            <Link onClick={() => setToggle(false)} className={styles.navLink} href='/admin'>Admin Dashboard</Link>
}
          </ul>
        </div>
      </nav>
  )
}

export default Navbar