const admin = require('firebase-admin')

const serviceAccount = require('../key/firebase-adminsdk-j86c7-47b152d6cd.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tag-bookmark-default-rtdb.firebaseio.com',
})

exports.register = async (ctx, next) => {
  ctx.status = 200

  try {
    // const auth = getAuth()

    const email = 'karen.hsieh.yh@gmail.com'
    const password = 'demodemo'
    getAuth()
      .getUserByEmail(email)
      .then(userRecord => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(`Successfully fetched user data: ${userRecord.toJSON()}`)
      })
      .catch(error => {
        console.log('Error fetching user data:', error)
      })

    ctx.response.body = {
      status: 200,
      autoCompleteList: data,
    }
  } catch (error) {
    console.error(`register - ${options.url} - ${error.message}`)
  }
}

exports.authLogin = async (ctx, next) => {
  ctx.status = 200

  try {
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .catch(function (err) {
    //     // Handle errors
    //   })
    // ctx.response.body = {
    //   status: 200,
    //   data,
    // }
  } catch (error) {
    console.error(`authLogin - ${options.url} - ${error.message}`)
  }
}
