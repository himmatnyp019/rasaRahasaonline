import { useState } from 'react'
import './Address.css'
import { useToast } from '../../context/ToastContext'
import { useTranslation } from 'react-i18next';

const Address = () => {
    const { showToast } = useToast();
    const {t}= useTranslation();
    const [hoveredBox, setHoveredBox] = useState(null);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => showToast("Address copied to clipboard."))
            .catch(err => console.error("Failed to copy", err));

    };  
    return (
        <div>
            <div className="basket">
                <div className="upper-svg">
                    <img src="/components/Location/wave-1.svg" alt="wave-design" />
                </div>

                <div className="main-address-contents">
                    <div className="text-title">
                        <h1 data-aos="fade-up" >{t("worldMart")}</h1>
                        <p data-aos="fade-up">{t("vf")}</p>
                    </div>
                    <div  className="mart-address-box">

                        <div className="box box1"
                            onMouseEnter={() => setHoveredBox('box1')}
                            onMouseLeave={() => setHoveredBox(null)}>
                            <img src="https://res.cloudinary.com/dqvv7yahd/image/upload/v1759239224/food_uploads/zupwvczfvtabteyumzbi.jpg" alt="mart-img" />
                            <div className="text-content">
                                <h1>Noksan Mart</h1>
                                <div className="row">


                                    <a href="https://kko.kakao.com/lDBZdH3E1x" target='blank'><img src="/components/Location/res/kakaoMap.png" alt="" /></a>
                                    <img
                                        src="/components/Location/res/copy.jpg"
                                        alt="copy"
                                        onClick={() => handleCopy("부산광역시 강서구 녹산산단335로 24-8")}

                                    />
                                </div>

                            </div>
                        </div>
                        <div className={`box box2 ${hoveredBox ? 'transform' : ''}`}>
                            <img src="https://res.cloudinary.com/dqvv7yahd/image/upload/v1759281567/food_uploads/ysorgzh2yblerpt8mdyi.png" alt="mart-img" />
                            <div className="text-content">
                                <h1>Nongong Mart</h1>
                                <div className="row">

                                    <a href="https://kko.kakao.com/6yjWYGI5mD" target='blank'><img src="/components/Location/res/kakaoMap.png" alt="" /></a>
                                    <img
                                        src="/components/Location/res/copy.jpg"
                                        alt="copy"
                                        onClick={() => handleCopy("대구 달성군 논공읍 북리 824-8 1층")}
                                    />
                                </div>


                            </div>
                        </div>
                        <div className="box box3"
                            onMouseEnter={() => setHoveredBox('box3')}
                            onMouseLeave={() => setHoveredBox(null)}>
                            <img src="https://res.cloudinary.com/dqvv7yahd/image/upload/v1759281509/food_uploads/hwiaamgdyedz5s3aa6ik.png" alt="mart-img" />
                            <div className="text-content">
                                <h1>Geoje Mart</h1>
                                <div className="row">


                                    <a href="https://kko.kakao.com/nLEYJ3LAmT" target='blank'><img src="/components/Location/res/kakaoMap.png" alt="" /></a>
                                    <img
                                        src="/components/Location/res/copy.jpg"
                                        alt="copy"
                                        onClick={() => handleCopy("경남 거제시 장평3로7길 13")}

                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="lower-svg">
                        <img src="/components/Location/wave-2.svg" alt="wave-design" />
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Address;
