window.v = '1.0.0';

ajax.init({
    baseUrl: 'http://192.168.1.120:3000'
});

$(() => {
    console.log('main 1 ', window.v);
    if (Page) {
        new Page(); 
    }
});
