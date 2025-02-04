import React, { useState, useRef } from "react";
import './pelvisdetectioncard.css';
import pelvis from '../../assets/pelvis.png';
import useUpload from "../../hooks/useUpload";
import Webcam from 'react-webcam'; // 添加 Webcam 导入
// navigation
import { useNavigate } from 'react-router-dom';


export default function pelvisdetectioncard() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const { isupload, filetobase64, upload } = useUpload();

    const [toggle, settoggle] = useState(false);
    const webcamRef = useRef(null); // 添加 webcamRef

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const filechangetype = await filetobase64(file);
        setSelectedFile(filechangetype);
    };

    const handleDetection = (e) => {
        e.preventDefault();
        const file = selectedFile;
        upload(file);
        navigate('/');
    }

    const handlescreenshot = (e) => {
        e.preventDefault();
        const screenshot = webcamRef.current.getScreenshot();
        if (screenshot) {
            settoggle({ photoURL: screenshot });
            const fileselect = screenshot.split(',')[1]
            setSelectedFile(fileselect);

        }
    }

    const screenshotrelode = (e) => {
        e.preventDefault();
        settoggle(false);
    }


    return (
        <div className="pelvisdetectioncard">
            <div className="pelvisdetectioncard__content__area">
                <div className="photocard_area">

                    <div className="pelvisdetectioncard__picture">
                        {/* 添加 Webcam 组件 */}
                        {
                            !toggle && <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{ facingMode: "user" }}
                            />
                        }
                        {
                            toggle && <img src={toggle.photoURL} alt="" className="pelvis_img" />
                        }
                    </div>
                    <div className="buttom_area">
                        <button onClick={screenshotrelode} className="pelvis_buttom">重新拍攝</button>

                        <button onClick={handlescreenshot} className="pelvis_buttom">拍攝</button>
                    </div>

                </div>
                <div>
                    <div className="pelvisdetectioncard__content">
                        <h2>說明：</h2>
                        <h2>1.確定位置後背對鏡頭</h2>
                        <h2>2.身體向前微彎</h2>
                        <h2>3.感受脊椎微微隆起即可</h2>
                        <h2>4.等待檢測結束</h2>
                        <h2>5.結束時畫面會呈現</h2>
                        <h2>6.詳細資料與建議請至紀錄查詢</h2>
                        <h2>請放入與圖片相符姿勢的照片</h2>
                        <input type="file" name="" id="" onChange={handleFileChange} />
                        {
                            isupload &&
                            <>
                                加載中<span className="loader"></span>
                            </>
                        }
                        <button onClick={handleDetection}>開始</button>

                    </div>
                </div>
            </div>
        </div>
    );
}
