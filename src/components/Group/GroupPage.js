import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

import GroupService from "../../services/group.service";


const GroupPage = () => {
    const [group, setGroup] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        GroupService.readGroupById(id)
            .then((res) => {
                setGroup(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            { group !== null ? (
                    <div>
                        <section>
                            <div className="feature-photo">
                                <figure><img src="https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png" alt=""  /></figure>
                                <div className="add-btn">
                                    {/* <span>1205 followers</span> */}
                                    <span>(số thành viên)</span>
                                    <a href="#" title="" data-ripple="">Join Group</a>
                                </div>
                                <form className="edit-phto">
                                    <i className="fa fa-camera-retro"></i>
                                    <label className="fileContainer">
                                        Edit Cover Photo
                                    <input type="file"/>
                                    </label>
                                </form>
                                <div className="container-fluid">
                                    <div className="row merged">
                                        <div className="col-lg-2 col-sm-3">
                                            <div className="user-avatar">
                                                <figure>
                                                    <img src="https://w.wallha.com/ws/14/KoWeELYH.jpg" alt="" />
                                                    <form className="edit-phto">
                                                        <i className="fa fa-camera-retro"></i>
                                                        <label className="fileContainer">
                                                            Edit Display Photo
                                                            <input type="file"/>
                                                        </label>
                                                    </form>
                                                </figure>
                                            </div>
                                        </div>
                                        <div className="col-lg-10 col-sm-9">
                                            <div className="timeline-info">
                                                <ul>
                                                    <li className="admin-name">
                                                    <h5>{ group.groupName }</h5>
                                                    <span>(public-private)</span>
                                                    </li>
                                                    {/* <li>
                                                        <a className="active" href="time-line.html" title="" data-ripple="">time line</a>
                                                        <a className="" href="timeline-photos.html" title="" data-ripple="">Photos</a>
                                                        <a className="" href="timeline-videos.html" title="" data-ripple="">Videos</a>
                                                        <a className="" href="timeline-friends.html" title="" data-ripple="">Friends</a>
                                                        <a className="" href="timeline-groups.html" title="" data-ripple="">Groups</a>
                                                        <a className="" href="about.html" title="" data-ripple="">about</a>
                                                        <a className="" href="#" title="" data-ripple="">more</a>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </section>
                            
                    <section>
                        <div className="gap gray-bg">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row" id="page-contents">
                                            <div className="col-lg-6">
                                                <div className="loadMore">
                                                    <div className="central-meta item">
                                                        <div className="new-postbox">
                                                            <figure>
                                                                <img src="../../images/resources/admin2.jpg" alt="" />
                                                            </figure>
                                                            <div className="newpst-input">
                                                                <form method="post">
                                                                    <textarea rows="2" placeholder="write something"></textarea>
                                                                    <div className="attachments">
                                                                        <ul>
                                                                            <li>
                                                                                <i className="fa fa-music"></i>
                                                                                <label className="fileContainer">
                                                                                    <input type="file" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <i className="fa fa-image"></i>
                                                                                <label className="fileContainer">
                                                                                    <input type="file" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <i className="fa fa-video-camera"></i>
                                                                                <label className="fileContainer">
                                                                                    <input type="file" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <i className="fa fa-camera"></i>
                                                                                <label className="fileContainer">
                                                                                    <input type="file" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <button type="submit">Publish</button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>	
                                    </div>
                                </div>
                            </div>
                        </div>	
                    </section>
                    </div>
                ) : <Loading />
            }
        </div>
    );
}

export default GroupPage;