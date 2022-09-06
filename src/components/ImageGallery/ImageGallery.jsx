import styles from './ImageGallery.module.css';

const Gallery = ({ children }) => (
  <ul className={styles.ImageGallery}>{children}</ul>
);
export default Gallery;
