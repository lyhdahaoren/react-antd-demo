import React from 'react'
import PropTypes from "prop-types";
import styles from '../..//assets/style/icon.module.less'
console.log(styles)
const SvgIcon = (c) => {
  const { iconClass, fill } = c;

  return (
      <svg aria-hidden="true" className={styles['svg-class']}>
        <use xlinkHref={`#icon-${iconClass}`} fill={fill} />
      </svg>
  )
}

SvgIcon.propTypes = {
  // svg名字
  iconClass: PropTypes.string.isRequired,
  // 填充颜色
  fill: PropTypes.string
}

SvgIcon.defaultProps = {
  fill: "currentColor"
}

export default SvgIcon
