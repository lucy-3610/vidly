import React from 'react';

const Like = ({ liked, onLikeToggle }) => {
    let classes = liked ? 'fa fa-heart' : 'fa fa-heart-o';
    return (<i onClick={onLikeToggle} style={{ cursor: "pointer" }} className={classes} aria-hidden="true"></i>);
}

export default Like;