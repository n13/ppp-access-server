/* eslint-disable no-undef */
import fetch from 'node-fetch';
import PPP from '..';

global.fetch = fetch;

jest.setTimeout(10000);

PPP.configure('test');

describe('setActiveUser', () => {

    test('setActiveUser', async () => {
        const authApi = PPP.authApi();
        const profileApi = PPP.profileApi();
        expect(authApi.activeUser).toBeNull();
        expect(profileApi.activeUser).toBeNull();
        PPP.setActiveUser('activeUser');
        expect(authApi.activeUser).toBe('activeUser');
        expect(profileApi.activeUser).toBe('activeUser');
        await authApi.signOut();
        expect(authApi.activeUser).toBeNull();
        expect(profileApi.activeUser).toBeNull();
    });
}); 