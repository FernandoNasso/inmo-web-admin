import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo from "../../assets/Logo transparente.png";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftColumn}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.rightColumn}>
        <a href="https://www.facebook.com/adrianatorresprop" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className={styles.facebookIcon} />
        </a>
        <a href="https://www.instagram.com/adrianatorrespropiedades/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className={styles.instagramIcon} />
        </a>
        <a href="https://wa.me/5491130985579" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} className={styles.whatsappIcon} />
        </a>
      </div>
    </div>
  );
};

export default Header;
