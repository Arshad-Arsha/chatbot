import { Loader2 } from "lucide-react";
import { css } from "@emotion/react";
import {
  forwardRef,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

interface ImageProps
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "src" | "height" | "width" | "alt" | "className"
  > {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
}

const errImage = "https://fakeimg.pl/400x300/ffd4d4/f70000?text=Failed";

const ProgressiveImage = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, placeholder, className, ...props }, ref) => {
    const [image, setImage] = useState<string | null>(placeholder || src);

    const failedRef = useRef(false);

    useEffect(() => {
      setImage(null);

      const img = new Image();

      img.className = className;

      img.src = src;
      img.onload = () => {
        if (failedRef.current) {
          failedRef.current = false;
          setImage(errImage);
          return;
        }

        setImage(src);
      };

      img.onerror = () => {
        failedRef.current = true;
        img.src = errImage;
        img.onerror = null;
      };

      return () => {
        img.onload = null;
      };
    }, [src]);

    if (!image) {
      return (
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px;

            animation: rotate 1s linear infinite;

            @keyframes rotate {
              0% {
                transform: rotate(0deg);
              }

              100% {
                transform: rotate(360deg);
              }
            }
          `}
          className={className}
        >
          <Loader2 />
        </div>
      );
    }

    return <img className={className} ref={ref} {...props} src={image} />;
  }
);

export default ProgressiveImage;
