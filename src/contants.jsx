// export const baseUrl = "https://brave-nearly-pug.ngrok-free.app/api";
export const baseUrl = `${window.location.origin}/api`;
// export const baseUrl = "http://192.168.100.2:9090/api";
export const userName = localStorage.getItem("name");
export const access = localStorage.getItem("accessToken");
export const refreshAccess = localStorage.getItem("refreshToken");
export const AuthHeaders = {
    headers: {
        "content-type": `multipart/form-data`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        Authorization: `Bearer ${access}`,
    },
};
export const authHeaders = {
    headers: {
        "content-type": `application/json`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        Authorization: `Bearer ${access}`,
    },
};