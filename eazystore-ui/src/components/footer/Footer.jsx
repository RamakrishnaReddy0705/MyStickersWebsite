import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


//import "./footer.css";
import styles from "./footer.module.css";


export default function Footer(){
    
    return(
        <>

       
        <footer className={styles.footer}>
        Built with 
        <FontAwesomeIcon icon={faHeart} className={styles["footer-icon"]} aria-hidden="true"></FontAwesomeIcon>
        by <a href="https://easybytes.com" target="_blank">
        Ramakrishna</a>
        </footer>
        </>
    );
}