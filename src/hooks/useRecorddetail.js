import { useEffect, useState } from "react";


export default function useRecorddetail() {
    const [isimage, setUpload] = useState(null);

    // base64 to file
    const base64tofile = async (base64, filename) => {
        // Decode the Base64 string to binary data
        const binaryData = atob(base64);

        // Create an ArrayBuffer to store the binary data
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const view = new Uint8Array(arrayBuffer);

        // Populate the ArrayBuffer
        for (let i = 0; i < binaryData.length; i++) {
            view[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });

        // Create a File from the Blob
        const file = new File([blob], filename);

        // You can now use the 'file' object as needed
        console.log('Converted file:', file);

        // Convert the file to an image
       
        setUpload(URL.createObjectURL(file));
    }


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
    
    const fetchRecord = async (data) => {
        try {
            const url = `http://localhost:3000/api/getDateImages/${"any5"}?datetime=${data}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                base64tofile(responseData.userImage,"user.png")
                setdata(responseData);
            } else {
                console.log("上傳失敗。");
                setRecord(false);
            }
        } catch (error) {
            console.error("上傳錯誤:", error);
            setRecord(false);

        }

    }

    

   

    return {  fetchRecord,isimage,isRecord, isdata, base64tofile };
}