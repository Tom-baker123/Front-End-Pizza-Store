const AuthenticationAPI = "https://localhost:44394/api/Auth"; // /login /register
// `/resend-activation?email=${email}`


// --[ API Đăng ký tài khoản ]-------------------------------------------------------- */}
export const registerUser = async (data) => {
    const res = await fetch(`${AuthenticationAPI}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    return await res.json();
};


// --[API Login]-------------------------------------------------------- */}
export const loginUser = async (payload) => {
    const res = await fetch(`${AuthenticationAPI}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    return await res.json();
};


// --[API resendActivation]-------------------------------------------------------- */}
export const resendActivation = async (email) => {
    const res = await fetch(`${AuthenticationAPI}/resend-activation?email=${email}`);
    return await res.json();
};