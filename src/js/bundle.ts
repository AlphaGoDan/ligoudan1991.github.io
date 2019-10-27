import { Utils } from './lib';

let main = () => {
    console.log('main ts');
    let val = Utils.getUrlQuery('test');
    console.log('getUrlStr', val);
};

main();
