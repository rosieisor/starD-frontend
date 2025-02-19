import React, {useCallback, useRef, useState} from "react";
import axios from "axios";
import Header from "../../components/repeat_etc/Header";
import Backarrow from "../../components/repeat_etc/Backarrow";
import toast from "react-hot-toast";

const NoticeInsert = () => {
    const [dataId, setDataId] = useState(0);
    const [posts, setPosts] = useState([]);
    const titleRef = useRef();
    const contentRef = useRef();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        created_date: new Date(),
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onInsertPost = useCallback((post) => {
        const {
            title,
            field,
            content,
            created_date
        } = post;

        const newData = {
            title,
            content,
            created_date,
            id: dataId,
        };
        setPosts((prevPosts) => [...prevPosts, newData]);

        setDataId((prevDataId) => prevDataId + 1);
        return newData;
    }, [posts, dataId]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();

        if (formData.title.trim() === '') {
            alert("제목을 입력해주세요.");
            titleRef.current.focus();
            return;
        }

        if (formData.content.trim() === '') {
            alert("내용을 입력해주세요.");
            contentRef.current.focus();
            return;
        }

        setFormData(onInsertPost(formData));

        const accessToken = localStorage.getItem('accessToken');

        const response = axios.post("/api/notices",
            {
                title: formData.title,
                content: formData.content,
            },
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                console.log(res.data);
                const id = res.data.postId;
                alert("게시글이 등록되었습니다.");
                window.location.href = `/notice/detail/${id}`;
            }).catch((error) => {
                console.log('전송 실패', error);
                alert("게시글 등록 실패");
            })
        e.preventDefault();
    }, [formData])

    return (
        <div className={"main_wrap"} id={"community"}>
            <Header showSideCenter={true}/>
            <div className="community_container">
                <div className="community_container">
                    <p id={"entry-path"}> 홈 > Notice </p>
                    <Backarrow subname={"Notice Insert"}/>
                    <form className="new_post_form" onSubmit={handleSubmit}>
                        <div style={{display: "flex"}}>
                            <span style={{paddingLeft: "10px", marginTop: "25px"}}>제목</span>
                            <input ref={titleRef} type="text" name="title" value={formData.title} onChange={handleInputChange}/>
                        </div>
                        <div>
                            <span>카테고리</span>
                            <span className="field_wrapper">
                    <select name="category" onChange={handleInputChange} disabled>
                        <option value="default">공지</option>
                    </select>
                </span>
                        </div>
                        <div style={{display: "flex"}}>
                            <span style={{paddingLeft: "10px", marginTop: "5px"}}>상세 내용</span>
                            <textarea ref={contentRef} name="content" value={formData.content} onChange={handleInputChange}/>
                        </div>
                        <div className="btn">
                            <input type="submit" value="등록하기" className="register_btn"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default NoticeInsert;