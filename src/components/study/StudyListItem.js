import LikeButton from "../repeat_etc/LikeButton";
import ScrapButton from "../repeat_etc/ScrapButton";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import default_profile_img from "../../images/default_profile_img.png";

import axios from "axios";
import ImageComponent from "../image/imageComponent";

function calculateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDifference = end - start;
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
}

function checkRecruitStatus(recruitStatus, proressStatus) {

    if (recruitStatus == "RECRUITING")
        return "모집 중";
    else if (proressStatus == "DISCONTINUE")
        return "중단된 스터디";
    else
        return "모집 완료";
}

const StudyListItem = ({studies, toggleLike, toggleScrap, d, index}) => {
    console.log(studies);
    const imgUrl = studies.recruiter.profile.imgUrl;
    const daysDifference = calculateDateDifference(studies.activityStart, studies.activityDeadline);
    const recruitStatus = checkRecruitStatus(studies.recruitStatus, studies.progressStatus);
    const navigate = useNavigate();


    const GoNextDetailPage = () => {
        // console.log(d.id);
        navigate(`/studydetail/${d.id}`, {state: studies.id})
    }


    return (
        <div className="list" key={studies.id}>
            <div className="list_header">
                <div className="list_sub_header">
                    <div className="list_day">
                        {daysDifference}일간의 스터디
                    </div>
                    <div className="list_status">{recruitStatus}</div>
                </div>
                <div className="list_btn">
                    <div className="list_like">
                        <LikeButton like={studies.like}
                                    onClick={() => toggleLike(index)}/>
                    </div>
                    <div className="list_scrap">
                        {/* 스크랩 버튼을 클릭하면 해당 스터디 리스트 항목의 스크랩 상태를 토글 */}
                        <ScrapButton scrap={studies.scrap}
                                     onClick={() => toggleScrap(index)}/>
                    </div>
                </div>
            </div>
            <div className="list_founder">
                <ImageComponent getImgName = {imgUrl} imageSrc={""} />
                <span>{studies.recruiter?.nickname}</span>
            </div>
            <div className="list_title" onClick={GoNextDetailPage}>{studies.title}</div>
            <div className="list_tag" onClick={GoNextDetailPage}>{studies.tags}</div>
            <div className="list_onoff" onClick={GoNextDetailPage}>{studies.onOff}</div>
            <div className="stroke"></div>
            <div className="list_deadline">
                마감일 | {studies.recruitmentDeadline}
            </div>
        </div>
    )
}
export default StudyListItem;