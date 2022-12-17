import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import AuthService from "../../services/auth.service";
import GroupService from "../../services/group.service";
import { setAllGroups } from "../../redux/actions/GroupActions";
import Group from "./Group";

const GroupList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [groups, setGroups] = useState([]);
    const [groupsJoined, setGroupsJoined] = useState([]);
    const [newGroups, setNewGroups] = useState([]);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        getAllGroups();
        getGroupsCurrentUserJoined(currentUser.id);
    }, [])
    useEffect(() => {
        let newGroups = (groups && groupsJoined) && groups.map(group => {
            if (groupsJoined.some(groupJoined => groupJoined.id === group.id)) {
                group.isJoined = true;
            } else {
                group.isJoined = false;
            }
            return group;
        });
        
        console.log(newGroups);

        setNewGroups(newGroups);
        
    }, [groupsJoined, groups])

    const getAllGroups = async () => {
        await GroupService.readAllGroups()
            .then(res => {
                setGroups(res.data);
                dispatch(setAllGroups(res.data))    
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getGroupsCurrentUserJoined = async (userId) => {
        await GroupService.readGroupsUserJoined(userId)
            .then(res => {
                setGroupsJoined(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="container">
            <button type="button" className="btn btn-primary mb-4" onClick={ () => navigate("/group/create") }>Tạo nhóm</button>

            <div className="col-lg-12">
                <div className="central-meta">
                    <div className="groups">
                        <span><i className="fa fa-users"></i> Groups</span>
                    </div>
                    <ul className="nearby-contct">
                    {  newGroups && newGroups.map((group, index) => <li key={ index }> <Group data={ group } user={ currentUser }/> </li>) }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default GroupList;