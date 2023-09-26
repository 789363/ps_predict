import { useState, useEffect } from "react";

export default function useRecordlist() {
    const json =
    {
        message: "成功取得使用者圖片列表",
        userRelatedDatetime: [
            {
                "date": "20230925_1746",
                "status": 1
            },
            {
                "date": "20230925_1747",
                "status": 2
            }
        ]
    }

    const [isdata, setdata] = useState(json);

    const [isRecord, setRecord] = useState(true);
    const fetachRecord = async (data) => {
        try {
            const url = `http://localhost:3000/api/getUserImages/${"any5"}`;
            const response = await fetch(url, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const responseData = await response.json();
                setdata(responseData);
            } else {
                console.log("上傳失敗。");
                setRecord(false);
            }
        } catch (error) {
            console.error("上傳錯誤:", error);
            setRecord(false);

        }

    };
    useEffect(() => {
        
        fetachRecord();
    }, []);


    return { fetachRecord, isRecord, isdata };
}