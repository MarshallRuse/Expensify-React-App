import authReducer from '../../../redux/reducers/auth';

test('Should set uid on login', () => {
    const action = {
        type: 'LOGIN',
        uid: '123abc'
    };
    const state = authReducer({}, action);
    expect(state).toEqual({
        uid: '123abc'
    });
});

test('Should clear uid on logout', () => {
    const action = {
        type: 'LOGOUT'
        };
    const state = authReducer({uid: 'anythingyouwantbaby'}, action);
    expect(state).toEqual({});
});