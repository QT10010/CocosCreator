import BaseView from "../../core/mvc/BaseView";
import App from "../../core/App";
import BagCtrl from "../bag/BagCtrl";
import BagView from "../bag/BagView";
import { ViewType, ViewShowType, ViewEvent, ViewLayerType } from "../../core/const/CoreConst";

/*
 * @Author: yanmingjie0223@qq.com
 * @Date: 2019-01-21 16:21:50
 * @Last Modified by: yanmingjie0223@qq.com
 * @Last Modified time: 2020-12-06 23:46:36
 */
export default class MainView extends BaseView {

    public static readonly key: string = 'MainView';

    private _bagBtn: fgui.GButton = null;

    public constructor() {
        super('main', 'MainView', ViewType.VIEW, ViewLayerType.MIDDLE_LAYER);
    }

    protected onShown(): void {

    }

    protected onInit(): void {
        this.initEvent();
        App.EventManager.addEventListener(ViewEvent.VIEW_SHOW, () => {
            console.log(`监听事件收到： view_show`);
        }, this)
    }

    public destroy() {
        if (this.isInit) {
            this.removeEvent();
        }
        super.destroy();
    }

    private onClickBtn(): void {
        App.ViewManager.show(BagCtrl, null, BagView, null, ViewShowType.SINGLETON_VIEW);
        // App.ViewManager.show(null, null, BagView, null, ViewShowType.SINGLETON_VIEW);
    }

    private initEvent(): void {
        this._bagBtn.onClick(this.onClickBtn, this);
        this.addEventListener(ViewEvent.VIEW_SHOW, (key: string) => {
            console.log(`show: ${key}`);
        }, this);
    }

    private removeEvent(): void {
        this._bagBtn.offClick(this.onClickBtn, this);
    }

}