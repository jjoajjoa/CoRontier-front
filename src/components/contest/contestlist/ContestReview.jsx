import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import Pagination from "react-js-pagination";



const ContestReview = () => {

    

    const [ContestReviews, setContestReviews] = useState([]);

    const ContestReviewcall = async () => {
        const url = `/contest/reviewlist.json`;
        const res = await axios(url);
        console.log(res.data);
        let list = res.data;
        list = list.map(p => p && { ...p, show: false });
        
        setContestReviews(list);
    }


    useEffect(() => {
        ContestReviewcall();
    }, []);

    const onClickTitle = (id) => {
        const newPosts = ContestReviews.map(p => p.post_id === id ? { ...p, show: !p.show } : p);
        // console.log(newPosts)
        setContestReviews(newPosts);
    }


    return (
        <div className='my-5 p-5'>
        <div className='text-center'>
         <h2>공모전 리뷰 게시판 </h2>
        </div>
            <Table striped hover className='text-center my-3'>
        <thead>
            <tr>
            <th>No</th><th>제목</th><td>작성자</td><td>작성일</td><td>조회</td>
            </tr>
        </thead>
           <tbody>
            {ContestReviews.map(ContestReview =>
                                <tr key={ContestReview.post_id}>
                                <td>{ContestReview.post_id}</td>   
                                <td>    
                                <div onClick={() => onClickTitle(ContestReview.post_id)} style={{ cursor: "pointer" }}>{ContestReview.title}</div>
                                <td colSpan={4}>
                                    {ContestReview.show && <div>{ContestReview.content}</div>}
                                </td>
                            </td>
                    <td width="20%"><div className='ellipsis'>{ContestReview.user_id}</div></td>
                    <td>{ContestReview.created_at}</td>
                    <td>{ContestReview.view_cnt}</td>
                </tr>
            )}
        </tbody>
        
    </Table>
</div>


    )
}

export default ContestReview