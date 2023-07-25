import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ itemsTotal, numPageItems, currentPage, onPageChange }) => {
    const numPages = Math.ceil(itemsTotal / numPageItems);
    if (numPages === 1) return null;
    const pages = _.range(1, numPages + 1);

    return (<nav aria-label="Page navigation">
        <ul className="pagination">
            {pages.map(page => <li key={page} className={page === currentPage ? "page-item active" : "page-item"}><a className="page-link" onClick={() => onPageChange(page)}>{page}</a></li>)}
        </ul>
    </nav>);
}

Pagination.propTypes = {
    itemsTotal: PropTypes.number.isRequired,
    numPageItems: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;