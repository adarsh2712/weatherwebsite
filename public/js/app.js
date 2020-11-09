

// fetch('http://puzzle.mean.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)

//     })
// })

// fetch('http://localhost:3000/weather?address=kundalwadi').then((response) => {
//     response.json().then((data) => {
//         if (data.error){
//             console.log(data.error)
//         }else{
//         console.log(data.location)
//         console.log(data.forecast)
//         }
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg-1')
const message2 = document.querySelector('#msg-2')
//message1.textcontent = ''

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //console.log(location)
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            //console.log(data.error)
            message1.textContent = data.error
        }else{
        //console.log(data.location)
        //console.log(data.forecast)
        message1.textContent = data.location
        message2.textContent = data.forecast
        }
    })
})
})