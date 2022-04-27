import React from 'react'

export default function BookingOption({address, city, description, image, name}) {
  return (
    <div>
        <h1>{address}</h1>
        <h1>{city}</h1>
        <h1>{description}</h1>
        <h1>{image}</h1>
        <h1>{name}</h1>
    </div>
  )
}
