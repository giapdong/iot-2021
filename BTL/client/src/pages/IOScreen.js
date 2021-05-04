import React, { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider'
import moment from 'moment'
import { StorageService } from '../services/storage.service'
import styled from 'styled-components'

const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  font-family: 'Poppins', sans-serif;
  /* z-index: 1; */
  .car {
    &__bg {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      overflow: hidden;
      video {
        width: 100%;
        height: 100%;
        --o-object-fit: cover;
        object-fit: cover;
        background: #232a34;
      }
    }
    &__container {
      padding: 2px 4px;
      z-index: 200;
      background: #fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      border: 4px solid #dde;
      @media (min-width: 640px) {
        font-size: 32px;
        padding: 12px 16px;
      }
    }
  }
`

const IOScreen = () => {
  const socket = useSocket()
  const [data, setData] = useState({})
  const [error, setError] = useState({})

  useEffect(() => {
    if (socket == null) return
    socket.on('connect-done', (data) => console.log(data))
    socket.on('dataFromServer', (data) => {
      console.log('dataFromServer')
      return setData(data)
    })
    socket.on('checkInFail', (err) => setError(err))

    return () => {
      socket.off('dataFromServer')
      socket.off('checkInFail')
    }
  }, [socket])
  console.log(error)
  if (data && data.data && data.data.car) {
    const { time, type } = data
    const { name, position, car } = data.data
    const { plate, carType } = car
    StorageService.saveCarInfo({
      time,
      type,
      name,
      position,
      plate,
      carType
    })
  }
  const carInfo = StorageService.getCarInfo()

  if (error) {
    // StorageService.removeCarInfo()
  }
  return (
    <Styles>
      {carInfo && (
        <>
          <div className="car__bg">
            <video autoPlay loop muted src="/bg_video.mp4" type="video/mp4" />
          </div>
          <div className="car__container">
            <img src="/logo.png" alt="" />
            <div className="car__content">
              <div className="car__header">
                <div>{error && error.error}</div>
                <div className="car__header__time">
                  Thời gian:{' '}
                  {moment(parseInt(carInfo.time)).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )}
                </div>
                <div className="car__header__type">
                  Kiểu ra vào: {carInfo.type}
                </div>
              </div>
              <div className="car__details">
                <div className="car__details__info">
                  <div className="car__details__owner">
                    <div>Tên chủ xe: {carInfo.name}</div>
                    <div>Vị trí: {carInfo.position}</div>
                  </div>
                  <div className="car__details__info__type">
                    Loại xe: {carInfo.carType}
                  </div>
                  <div>Biển số: {carInfo.plate}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Styles>
  )
}

export default IOScreen
