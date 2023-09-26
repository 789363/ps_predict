import React from "react";
import './recorddetail.css';
import redress from '../../assets/redress.png';
import useRecorddetail from "../../hooks/useRecorddetail";
import { useState, useEffect } from "react";

export default function Recorddetail(props) {
    const detailstate = props.detailstate;
    const consistdetail = props.consistdetail;


    const { fetchRecord,isimage, isdata, base64tofile } = useRecorddetail();

    
    useEffect(() => {
        fetchRecord(props.data.date);
    }, []);
   
    console.log(isimage);
    


    return (
        <div className="modal-overlay" onClick={detailstate} >
            <div className="recorddetail" onClick={consistdetail} >
                <div className="recorddetail__content__area__top">
                    <div className="recorddetail__button">
                        <button onClick={detailstate}>{"<"} 返回</button>
                    </div>
                    <div className="recorddetail__title">
                        <h1>詳細記錄</h1>
                    </div>
                </div>
                <div className="recorddetail__content__area">
                    <div className="recorddetail__content">
                        <h2>狀態：{isdata.status}</h2>
                        <h2>傾斜角度：{isdata.angle}度</h2>
                        <h2>檢測結果：需校正</h2>
                        <h2>建議復健動作：</h2>
                        <h2>橋式、深蹲、平板撐、下犬式、屈膝伸展</h2>
                        <h2>檢查日期：{props.data.date}</h2>
                    </div>
                    <div className="recorddetail__line_group">
                        <div className="recorddetail__line">-</div>
                        <div className="recorddetail__line" />
                        <div className="recorddetail__line" />
                    </div>
                    <div>
                        <img src={isimage} alt="" style={{maxWidth:"600px",maxHeight:"500px",width:"100%",height:"100%"}}/>
                    </div>
                </div>

            </div>

        </div>
    );
}
