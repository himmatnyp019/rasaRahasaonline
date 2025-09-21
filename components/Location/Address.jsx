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
                            <img src="/components/Location/res/nongon-mart.png" alt="mart-img" />
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
                        <div className={`box box2 ${hoveredBox ? 'transform' : ''}`}>
                            <img src="/components/Location/res/noksan-mart.png" alt="mart-img" />
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
                            <img src="/components/Location/res/geoje-mart.png" alt="mart-img" />
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
