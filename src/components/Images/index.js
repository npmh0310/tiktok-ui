import { useState, forwardRef } from 'react'; //? sử dụng forwardref để có thể lấy được ref và sử dụng được cho tippy trong Menu
import images from '~/assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames';
// console.log(images.noImage)
//? fallback: customFallback đổi tên fallback thành vậy để không lỗi với ở dưới.
//? Khi mà không truyền fallback từ ngoài vào thì sẽ lấy images.noImage
//? Nếu có truyền fallback từ ngoài vào thì sẽ lấy fallback từ bên ngoài (ví dụ ở đây là fallback ở file index.js(header))
const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    //? {...props} thì nó sẽ lấy tất cả properties của img truyền qua component này rồi render lại vào trong thẻ img ở dưới
    //? thêm className vào để xử lý việc lỗi khi gửi ảnh không có ra
    return (
        <img
            className={classNames(styles.wrapper, className)}
            src={fallback || src}
            alt={alt}
            ref={ref}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
