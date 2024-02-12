import WebStorageService from '../services/webstorage.service';
import invoiz from '../services/invoiz.service';

export default ({webStorageKey, filterItems, url}) => {
    let settings = WebStorageService.getItem(webStorageKey);
    if(!settings) return;

    WebStorageService.setItem(webStorageKey, {filter: filterItems});
    invoiz.router.navigate(url || '/');
}