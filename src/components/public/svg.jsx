import React from 'react'
import PropTypes from "prop-types";
import styles from '../..//assets/style/icon.module.less'
const SvgIcon = (c) => {
  const { iconClass, fill, svgClass } = c;
  const returnClass = (svgClass) => {
    return svgClass ? (styles['svg-class'] + ' ' + svgClass) : styles['svg-class']
  }
  return (
      <svg aria-hidden="true" className={returnClass(svgClass)}>
        <use xlinkHref={`#icon-${iconClass}`} fill={fill} />
      </svg>
  )
}

SvgIcon.propTypes = {
  // svg名字
  iconClass: PropTypes.string.isRequired,
  // 填充颜色
  fill: PropTypes.string,
  svgClass: PropTypes.string
}

SvgIcon.defaultProps = {
  fill: "currentColor"
}

export default SvgIcon
