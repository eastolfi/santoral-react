let windowSpy: any;

beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');

    windowSpy.mockImplementation(() => ({
        Notification: {
            permission: 'default',
            requestPermission: Promise.resolve('default')
        },
    }));

    global.Notification = windowSpy.Notification;
});

afterEach(() => {
    windowSpy.mockRestore();
});

export {};
