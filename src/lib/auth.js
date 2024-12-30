import cookie from 'cookie';

export function getTokenFromCookies(req) {
    const cookies = cookie.parse(req.headers.cookie || '');
    return cookies.token;
}
