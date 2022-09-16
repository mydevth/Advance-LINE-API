import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import type { Liff as LiffAPIs } from '@liff/liff-types';
import type { LiffExtendableFunctions } from '@liff/extensions';
import type { ApiHooks, HookTimings, LiffPlugin as _LiffPlugin, LiffPluginContext as _LiffPluginContext } from '@liff/use';
export interface Liff extends LiffAPIs, LiffExtendableFunctions {
}
export declare type LiffPluginContext<UserDefineHooks extends ApiHooks = {}> = _LiffPluginContext<Liff, UserDefineHooks>;
export declare type LiffPlugin<LiffPluginApi, LiffPluginOption = void, LiffHookTimings extends HookTimings = {}> = _LiffPlugin<LiffPluginApi, LiffPluginOption, LiffHookTimings, Liff>;
declare const liff: Liff;
export { liff };
export default liff;
