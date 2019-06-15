import React, { Component } from "react"
import PropTypes from "prop-types";

class Pagination extends Component {

    constructor() {
        super()
    }

    render() {
        const { total, currentPagination, limit, onClick: handleClick } = this.props

        if (total <= 0) return null

        const pageCount = Math.ceil(total / limit)

        return (
            <ul className="pagination center-align">
                {
                    Array(pageCount).fill().map((val, i) => {
                        const className = (i + 1) == currentPagination ? "active" : "waves-effect"
                        return (
                            <li className={className} onClick={() => handleClick(i + 1)} key={i}><a href="#!">{i + 1}</a></li>
                        )
                    })
                }
            </ul>
        )
    }
}

Pagination.defaultProps = {
    currentPagination: 1,
    limit: 5,
    onClick: () => null
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    currentPagination: PropTypes.number,
    limit: PropTypes.number,
    onClick: PropTypes.func
}

export default Pagination