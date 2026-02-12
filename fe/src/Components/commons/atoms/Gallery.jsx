import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ImagePreview from "./ImagePreview";
import { ImageURLKoplink } from "../../../api";

export default function Gallery({ images, type, className }) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    console.log('images', images)

    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                {images.map((src, i) => (
                    <ImagePreview
                        key={i}
                        className="w-full aspect-video"
                        src={`${ImageURLKoplink}${type}/${src}`}
                        onClick={() => {
                            setIndex(i);
                            setOpen(true);
                        }}
                    />
                ))}
            </div>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={images.map((src) => ({
                    src: `${ImageURLKoplink}${type}/${src}`,
                }))}
                controller={{
                    closeOnBackdropClick: false,
                    closeOnPullDown: false,
                }}
                portal={{ root: document.body }}
            />


        </>
    );
}
