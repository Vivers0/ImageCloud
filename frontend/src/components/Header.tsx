import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from '../styles/header.module.css';

const Header = () => {
    return (
        <>
            <CloudUploadIcon className={styles.headerIcon} />
            <h1 className={styles.headerText}> ImageCloud</h1>
        </>
    )
}

export default Header;