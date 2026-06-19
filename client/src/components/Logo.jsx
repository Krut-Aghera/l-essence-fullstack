import React from 'react'

const Logo = ({ src, className = '' }) => {
      return (
            <img
                  className={className}
                  src={src}
                  alt="L'Essence website logo" />
      )
}

export default Logo