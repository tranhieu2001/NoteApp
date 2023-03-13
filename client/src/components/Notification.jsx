// import { Notifications } from '@mui/icons-material'
// import { Badge, Menu, MenuItem } from '@mui/material'
// import { createClient } from 'graphql-ws'
// import { useEffect, useState } from 'react'

// function Notification() {
//   const [invisible, setInvisible] = useState(true)
//   const [notification, setNotification] = useState('')
//   const [anchorEl, setAnchorEl] = useState(null)
//   const open = Boolean(anchorEl)

//   const handleClick = (e) => {
//     if (notification) {
//       setAnchorEl(e.currentTarget)
//     }
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//     setNotification('')
//     setInvisible(true)
//   }
//   // ---------------------------- Setup nhận các data realtime từ socket ----------------------------
//   const query = `subscription Subscription {
//     notification {
//       message
//     }
//   }`

//   const client = createClient({
//     url: import.meta.env.VITE_GRAPHQL_CLIENT_WEBSOCKET,
//   })

//   const connectToSocket = async () => {
//     const onNext = (data) => {
//       console.log(data)
//       setInvisible(false)

//       const message = data?.data?.notification?.message
//       setNotification(message)
//     }

//     await new Promise((resolve, reject) => {
//       client.subscribe(
//         {
//           query,
//         },
//         {
//           next: onNext,
//           error: reject,
//           complete: resolve,
//         }
//       )
//     })
//   }
//   // ---------------------------- Setup nhận các data realtime từ socket ----------------------------
//   useEffect(() => {
//     connectToSocket()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <>
//       <Badge color="secondary" variant="dot" invisible={invisible}>
//         <Notifications
//           sx={{ width: '25px', cursor: 'pointer', height: '25px' }}
//           onClick={handleClick}
//         />
//       </Badge>
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         disableAutoFocusItem
//       >
//         <MenuItem onClick={handleClose}>{notification}</MenuItem>
//       </Menu>
//     </>
//   )
// }

// export default Notification
