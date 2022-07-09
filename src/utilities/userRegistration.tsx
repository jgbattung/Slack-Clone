interface userRegistrationParams {
    email: string
    password: string
    password_confirmation: string
}


async function userRegistration (user: userRegistrationParams) {
    // HTTP Method: POST
    // URL: {{url}}/api/v1/auth/
    // {
    //     "email": "user1@example.com",
    //     "password": "12345678",
    //     "password_confirmation": "12345678"
    // }
    const apiSettings = {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": user.email,
            "password": user.password,
            "password_confirmation": user.password_confirmation,
        })
    }
    const response = await fetch('http://206.189.91.54/api/v1/auth/', apiSettings)
    const data = await response.json()

    const apiResponse = {
        success: response.ok,
        data: data.data,
        errors: data.errors ? data.errors: []
    }
    
    return apiResponse;
}

export default userRegistration;