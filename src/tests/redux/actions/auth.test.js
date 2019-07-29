import { login, logout } from '../../../redux/actions/auth';

test('Should return a login action object', () => {
    const uid = '123abc';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('Should return a logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});